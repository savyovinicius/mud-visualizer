function is_in_list(lst, item){
    for (var i = lst.length - 1; i >= 0; i--) {
        if (JSON.stringify(lst[i]) == JSON.stringify(item)) return true
    }
    
    return false
}

function verify_abstraction(item){
    if (allNodesObj.all_nodes[item].group > 2) return "internet"
    else return "local"
}

function graph_exporter(){
    var list = []
    for (i in network.get_nodes_links_json().nodes) {
        node = allNodesObj.getNode(network.get_nodes_links_json().nodes[i].name)

        for (j in node.get_protocols("incoming")){
            edge = node.get_protocols("incoming")[j]

            for( k in edge.src_dst_ports_tuples){

                if(edge.target != "Internet"){

                    var tuple = edge.src_dst_ports_tuples[k]
                    list.push({
                        incoming: false,
                        src: node.name, 
                        dst: edge.target, 
                        remote_abstraction: verify_abstraction(edge.target), 
                        network: edge.network[0], 
                        transport: edge.transport[0], 
                        t_src: tuple[1], 
                        t_dst: tuple[0]
                    })
                }
            }
        }

        for (j in node.get_protocols("outgoing")){
            edge = node.get_protocols("outgoing")[j]

            for( k in edge.src_dst_ports_tuples){

                if(edge.target != "Internet"){

                    var tuple = edge.src_dst_ports_tuples[k]
                    list.push({
                        incoming: true,
                        src: edge.target,
                        dst: node.name,
                        remote_abstraction: verify_abstraction(edge.target),
                        network: edge.network[0],
                        transport: edge.transport[0],
                        t_src: tuple[1],
                        t_dst: tuple[0]
                    })
                }
            }
        }
    }

    file_saver(JSON.stringify(list), "mud_graph.json", "text/plain", "exp_graph")
}