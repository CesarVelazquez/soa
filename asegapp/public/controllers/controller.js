

function AppCtrl($scope, $http){
	console.log("Hola desde el controlador");

	// La petición de los datos está en una función refresh para actualizar la lista cuando se ingresa un nuevo registro
	var refresh = function(){
		// Especifica la ruta de donde se traen los datos
		$http.get('/polizas').success(function(response){
			console.log("Recibí la información que pedí");
			//Pasamos los datos obtenidpos a la tabla
			$scope.polizas = response;
			//Borramos el contenido del formulario
			$scope.pol = "";
		});
	};

		// Se llama a la función que trae los datos al cargar la página
		refresh();


		$scope.addPoliza = function(){
			console.log($scope.pol);
			$http.post('/polizas', $scope.pol).success(function(response){
				console.log(response);
				//Después de agregar un nuevo registro, actualizamos los datos de la tabla
				refresh();
			});
		};


		//Función para borrar de la BD
		$scope.remove = function(id){
			console.log(id);
			$http.delete('/polizas/' + id).success(function(response){
				refresh();
			});
		};

		//Función para editar registro
		$scope.edit = function(id){
			$http.get('/polizas/' + id).success(function(response){
				$scope.pol = response;
			});
		};

		$scope.update = function(){
			console.log($scope.pol._id);
			$http.put('/polizas/'+ $scope.pol._id, $scope.pol).success(function(response){
				refresh();
			});
		};

		$scope.prueba = function(){
			console.log("actualiza ng");
			refresh();
		};

}






/*var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http', function($scope, http){
	console.log("Mensaje Log desde controller");

	// Se crea la ruta de donde se van a tomar los datos
	$http.get('/polizas');

	person1 = {
		name: "Tim",
		email: "mail@mail.com",
		number: "(111) 111-111-1111"
	};

	person2 = {
		name: "Emily",
		email: "emily@mail.com",
		number: "(222) 222-222-2222"
	};

	person3 = {
		name: "John",
		email: "john@mail.com",
		number: "(333) 333-333-3333"
	};

	var polizas = [person1,person2, person3];

	$scope.polizas = polizas;


}]);*/


