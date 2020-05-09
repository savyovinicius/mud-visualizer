function export_nodes_list() {

	nodes = allNodesObj.getNodesByGroup(1);

	var net_address = prompt("Insert the network IP address:", "192.168.5.")

	var list = []
	dev_ip = 100
	for(i in nodes){
		if (nodes[i].is_controlle_or_mycontroller()) {
			list.push({
				name: nodes[i].name,
				ip: ''
			})
		} else {
			list.push({
				name: nodes[i].name,
				ip: net_address + dev_ip
			})

			dev_ip++
		}
	}

	file_saver(JSON.stringify(list), "mud_nodes.json", "text/plain", "exp_nodes")
}