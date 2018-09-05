

var orders=[];
var product="";
	 async function loadOrders(){
         await getOrders();
        for(var order=0;order<orders.length;order++){
             var orderArrayHeader = ["Product","Quantity","Price"];
             var body = document.getElementById("orders");
                    tbl  = document.createElement("table");
                tbl.setAttribute("class","table table-striped");
                tbl.setAttribute("id", order);

                for(var clave in orders[order].orderAmountsMap){
                             await getPrice(clave);

                    var tr = tbl.insertRow();
                            var td = tr.insertCell();
                            td.appendChild(document.createTextNode(clave));
                            td = tr.insertCell();
                            td.appendChild(document.createTextNode(orders[order].orderAmountsMap[clave]));
                            td = tr.insertCell();
                            td.appendChild(document.createTextNode(product.price));
                }
                body.appendChild(tbl);
                tbl=document.getElementById(order);
                var header = tbl.createTHead();
                var row = header.insertRow(0);
                for(var i = 0; i <orderArrayHeader.length ; i++){
                   var cell = row.insertCell(i);
                   cell.outerHTML ="<th scope='col'>"+ orderArrayHeader[i]+"<th>";}
                row.deleteCell(5);
                row.deleteCell(4);
                row.deleteCell(3);
                txt = document.createTextNode('\x0A');
                tbl.appendChild(txt);

            }

	}

	function addOrder(newOrder){
	    orders.push(newOrder);
	}

	function removeOrderById(id){
    	   var elem = document.getElementById(id);
            elem.parentNode.removeChild(elem);

    	}

     async function getOrders(){

          await axios.get( "http://localhost:8080/orders")
           .then(function (response) {
                orders=response.data
           })
           .catch(function (error) {
             console.log('There is a problem with our servers. We apologize for the inconvince, please try again later', error.message);

           })
           .then(function () {
             // always executed
           });

    }
   /* async function getPrice(product) {
      try {
        const response = await axios.get( "http://localhost:8080/orders/"+product);
        product= response.data;
      } catch (error) {
        console.error(error);
      }
    }*/
     async function getPrice(p){
          await axios.get( "http://localhost:8080/orders/"+p)
                   .then( function (response) {
                        product=response.data
                   })
                   .catch(function (error) {
                     console.log('There is a problem with our servers. We apologize for the inconvince, please try again later', error.message);;
                   })
                   .then(function () {
                     // always executed
                   });
    }








