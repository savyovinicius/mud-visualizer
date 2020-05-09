function is_in_list(lst, item){
    for (var i = lst.length - 1; i >= 0; i--) {
        if (JSON.stringify(lst[i]) == JSON.stringify(item)) return true
    }
    
    return false
}

function verify_abstraction(lst, item){
    if (is_in_list(lst, item)) return "internet"
    else return "local"
}

function graph_exporter(){
    var list = []
    for (i in network.get_nodes_links_json().nodes) {
        node = allNodesObj.getNode(network.get_nodes_links_json().nodes[i].name)

        dn_in_edges = allNodesObj.all_nodes[network.get_nodes_links_json().nodes[i].name].get_protocols_by_abstraction("incoming","domain-names")
        dn_out_edges = allNodesObj.all_nodes[network.get_nodes_links_json().nodes[i].name].get_protocols_by_abstraction("outgoing","domain-names")


        for (j in node.get_protocols("incoming")){
            edge = node.get_protocols("incoming")[j]

            for( k in edge.src_dst_ports_tuples){
                var tuple = edge.src_dst_ports_tuples[k]
                list.push({
                    src: node.name, 
                    dst: edge.target, 
                    remote_abstraction: verify_abstraction(dn_in_edges, edge), 
                    network: edge.network, 
                    transport: edge.transport, 
                    t_src: tuple[0], 
                    t_dst: tuple[1]
                })
            }
        }

        for (j in node.get_protocols("outgoing")){
            edge = node.get_protocols("outgoing")[j]

            for( k in edge.src_dst_ports_tuples){
                var tuple = edge.src_dst_ports_tuples[k]
                list.push({
                    src: edge.target,
                    dst: node.name,
                    remote_abstraction: verify_abstraction(dn_in_edges, edge),
                    network: edge.network,
                    transport: edge.transport,
                    t_src: tuple[1],
                    t_dst: tuple[0]
                })
            }
        }
    }
    console.log(JSON.stringify(list))

    file_saver(JSON.stringify(list), "mud_graph.json", "text/plain", "exp_graph")
}