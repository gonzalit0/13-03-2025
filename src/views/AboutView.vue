<template>
	<div class="about container">
		<h2 class="mt-5 mb-5 text-center">Consulta de Usuarios</h2>
		<form class="row g-3">
			<div class="col-auto">
				<input type="text" 
				readonly 
				class="form-control-plaintext" 
				id="staticLabel" 
				value="Ingrese username: ">
			<!-- <v-skeleton-loader type=""></v-skeleton-loader> -->
			</div>
			<div class="col-auto">
				<input type="text" 
				class="form-control" 
				v-model="textUsername"
				id="userInput">
			</div>
			<div class="col-auto">
				<button type="button" 
				@click="searchUser"
				class="btn btn-primary mb-3">
				Buscar Usuarios</button>
			</div>
			<!-- <div class="col-auto"> 
				<button type="button" 
				data-bs-toggle="modal" 
				data-bs-target="#exampleModal" 
				data-bs-whatever="@mdo"
				class="btn btn-success mb-3">
				Crear Usuarios</button>
			</div> -->
			<div class="col-auto"> 
				<button type="button" 
				@click="PDF()"
				class="btn btn-danger mb-3">
				Descargar PDF</button>
			</div>
		</form>

		<form class="row g-3">
			<div class="col-auto">
				<input type="text" 
				readonly 
				class="form-control-plaintext" 
				id="staticLabelArchivo" 
				value="Leer archivo: ">
			</div>
			<div class="col-auto">
				<input type="file"
				id="archivoExcel" 
				class="form-control"
				@change="subirExcel()" 
				>
			</div>
		</form>
		<!-- <v-sheet color="grey" class="px-3 pt-3 pb-3" v-if="listardatos"> -->
			<!-- <v-skeleton-loader class="mx-auto" type="table" v-if="!listardatos"></v-skeleton-loader> -->
		<!-- </v-sheet> -->
		<table id="elemento-to-pdf" style="margin-top: 24px;" class="table"
		:items="listardatos" :fields="fields">
			<thead class="table-dark">
				<tr>
				<th scope="col">#ID</th>
				<th scope="col">Nombre</th>
				<th scope="col">Nombre de Usuario</th>
				<th scope="col">Correo</th>
				</tr>	
			</thead>
			<tbody v-if="!listardatos">
				<tr v-for="(row, rowIndex) in rows" :key="rowIndex">
				<td v-for="(cell, cellIndex) in row" :key="cellIndex">
				<Skeleton />
				</td>
				</tr>
			</tbody>
			<tbody v-else>
				
				<tr v-for="ld in listardatos" v-bind:key="ld.id">
				<th scope="row">{{ ld.id }}</th>
				<td>{{ ld.name }}</td>
				<td>{{ ld.username }}</td>
				<td>{{ ld.email }}</td>
				</tr>
			</tbody>
			</table> 

			<!-- <table
			style="margin-top: 24px;" class="table"
			id="table2"
			:items="listaExcel" :fields="fields2">
			<thead class="table-dark">
				<tr>
				<th scope="col">#ID</th>
				<th scope="col">Nombre</th>
				<th scope="col">Nombre de Usuario</th>
				<th scope="col">Correo</th>
				</tr>	
			</thead>
			<tbody>
				<tr v-for="ld in listaExcel" :key="ld.id">
				<th scope="row">{{ ld.id }}</th>
				<td>{{ ld.name }}</td>
				<td>{{ ld.username }}</td>
				<td>{{ ld.email }}</td>
				</tr>
			</tbody>
			</table> -->

			<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form>
					<div class="mb-3">
						<label for="recipient-name" class="col-form-label">Recipient:</label>
						<input type="text" class="form-control" id="recipient-name">
					</div>
					<div class="mb-3">
						<label for="message-text" class="col-form-label">Message:</label>
						<textarea class="form-control" id="message-text"></textarea>
					</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Send message</button>
					</div>
				</div>
			</div>
			</div>
	</div>
</template>

<script >

	import { userapi } from '@/api/userapi'
	import html2pdf from 'html2pdf.js'
  	import axios from 'axios'
	import readXlsFile from 'read-excel-file'

	export default {
		name: 'App',
		data: () => ({
			fields: ['id', 'name', 'username', 'email'],
			rows: new Array(8).fill(new Array(4).fill(null)),
			id: "",
			name: "",
			username: "",
			email: "",
			listardatos: null,
			textUsername: '',
			listaExcel: [],
			fields2: [0, '', '', ''],
			cabecera:[
				{text:"id", value:'0'},
				{text:"name", value:'1'},
				{text:"username", value:'2'},
				{text:"email", value:'3'}
			],
		
		}),

	// 	data() {
    //   return {
    //     fields: ['id', 'name', 'username', 'email'],
    //     id: "",
    //     name: "",
    //     username: "",
    //     email: "",
    //     listardatos: [],
	// 	items: [],
	// 	cabecera:[
	// 			{text:"ID", value:'0'},
	// 			{text:"Nombre", value:'1'},
	// 			{text:"UserName", value:'2'},
	// 			{text:"Correo", value:'3'}
	// 		],
	// 	textUsername: ''
    //   }
    // },

	mounted(){
		`${this.textUsername}`.valueOf("");
		setTimeout(() => {
			this.searchUser();
		}, 5000);
		
	},

	methods: {
		subirExcel(){
			const input = document.getElementById("archivoExcel");
			const listaExcel = [
			["id", "name", "userName", "email"], // Cabecera del Excel
			];
			const headers = listaExcel[0]; 
			readXlsFile(input.files[0]).then((rows) => {
				const listaConCampos = rows;
				this.listardatos = listaConCampos.slice(0).map(row =>
						Object.fromEntries(row.map((value, index) => [headers[index].toLowerCase(), value]))
				);

				console.log("Excel list:", this.items)
				input.value = "";
			});

		},
		async searchUser () {

		let textUsername = `${this.textUsername}`;
		console.log("user: ", textUsername)
		
		axios.get(`${userapi}`)
		.then(response => {
			this.listardatos = textUsername == '' ? response.data : response.data.filter(item => item.username == textUsername);
			if(this.listardatos.length == 0){
				alert('Username no encontrado');
			}
			console.log("Lista: ", this.listardatos);

		})
		.catch(function (error){
			alert('Username no encontrado')
			console.log(error);

		})
		.finally(function(){

			// Se ejecuto sin problemas

		});
		},

		// Descargar(){
		// 	const data = this.items;
		// 	const fileName = 'download';
		// 	const exportType = exportFromJSON.types.json;
		// 	exportFromJSON({data, fileName, exportType});
		// }

		PDF(){
			var element = document.getElementById('elemento-to-pdf');
			var opt= {
				margin: 1,
				filename:'table.pdf',
				image: { type: 'jpeg', quality:0.98},
				html2canvas: { scale:2},
				jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
			};
			html2pdf().from(element).set(opt).save();
		}
	}
	}
</script>

<style scoped>
	.about {
		min-height: 60vh;
		max-width: 895px;
		margin: auto;
	}
	
</style>
