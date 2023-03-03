import { SafeAreaView, StatusBar, StyleSheet,FlatList,View } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"

import { useState , useEffect } from "react";
import {Nota} from './src/componentes/Nota'
import { CriarTabela, buscaNotas, buscaNotasFilter } from "./src/services/Notas";
import { Picker } from "@react-native-picker/picker";



export default function App() {
const [notas , setNotas]=useState([])
const [notaSelecionada , setNotaSelecionada]=useState([])
const [categoria , setCategoria]=useState("Todos")



async function getAll() {
  if(categoria=="Todos"){
const  todasNotas = await buscaNotas();
setNotas(todasNotas);
return;
  }else{
    const  notasFiltradas = await buscaNotasFilter(categoria);
    setNotas(notasFiltradas);
  }
}







useEffect(() => {
  CriarTabela();
  getAll();
}, [categoria]);



  return (
    <SafeAreaView style={estilos.container}>
         <View style={estilos.modalPicker}>
                <Picker
                  selectedValue={categoria}
                  onValueChange={novaCategoria =>{
                    setCategoria(novaCategoria);
                    getAll();
                  }}
                >
                  <Picker.Item label='Todos' value='Todos' />
                  <Picker.Item label='Pessoal' value='Pessoal' />
                  <Picker.Item label='Trabalho' value='Trabalho' />
                  <Picker.Item label='Outros' value='Outros' />
                </Picker>
              </View>
      <FlatList
      data={notas}
      renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />}
      keyExtractor={nota=>nota.Id}
      />
      <NotaEditor mostraNotas={getAll} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

