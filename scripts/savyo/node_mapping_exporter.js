function export_nodes_list() {

	nodes = allNodesObj.getNodesByGroup(1);
	nodes.push(...allNodesObj.getNodesByGroup(2));

	var net_address = prompt("Insert the network IP address:", "192.168.5.")

	var list = []
	dev_ip = 100
	for(i in nodes){
		if (nodes[i].is_controlle_or_mycontroller()) {

			dev_addr = prompt("Set the " + nodes[i].name + " address", "1")

			list.push({
				name: nodes[i].name,
				ip: net_address + dev_addr
			})
		} else {

			if(nodes[i].name != "Router"){
				list.push({
					name: nodes[i].name,
					ip: net_address + dev_ip
				})

				dev_ip++
			}
		}
	}

	file_saver(JSON.stringify(list), "mud_nodes.json", "text/plain", "exp_nodes")
}