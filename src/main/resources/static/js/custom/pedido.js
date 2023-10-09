jsreport.serverUrl = `http://10.1.32.187:443`
var app = new Vue ({
    el: '#app', 
    vuetify: new Vuetify({}), 
    data: {
        headers: [
            { text: 'Data Inclusão', value: 'dtIncl' },
            { text: 'Responsável', value: 'responsavel' }, //Posto/Grad-Nome de Guerra -> postGraduacao nomeGuerra
            { text: 'Tel/Ramal', value: 'telefone' },
            { text: 'Local de Partida', value: 'localPartida' },
            { text: 'Destino', value: 'destino' },
            { text: 'Descrição Serviço', value: 'descSvc' },
            { text: 'Quantidade Passageiros', value: 'passageirosQnt' },
            { text: 'Motorista Espera', value: 'motoristaEsperar' },
            { text: 'status', value: 'status' },
            { text: 'Data Viagem', value: 'dtViagem' },
            { text: 'Motorista', value: 'motorista' },
            { text: 'Viatura', value: 'viatura' }, //Modelo/Placa
            { text: 'Gerar PDF', value: 'pdfMeuPedido' }
            

        ], 
        items: [], 
        itemsfiltrados: [], 
        dialog: false, 
        cliente: {}, 
        search: null, 
            obrigatorio: [
                v => !!v || "Campo Obrigatório",
            ]
    }, 

        computed: {

        }, 
        watch: {
        
        }, methods: {
            async getPedidos() {
                let {  page, itemsPerPage} = this.options
                page = page ? page : 1
                await axios.get(`pedidoViatura/todosPedidos/?page=${page - 1}&size=${itemsPerPage}`).then((resp) => {
                    this.dataTablePedido.totalItens = resp.data.totalElements
                    this.dataTablePedido.itemsPerPage = resp.data.size
                    this.dataTablePedido.dataTablePage = resp.data.pageable.pageNumber +1
                    this.pedido = resp.data.content
                    this.dataTablePedido.items = resp.data.content 
                    console.log( this.dataTablePedido.items)
                }).finally(()=> this.dataTablePedido.loading = false)


        },
    
        novo() {
           this.novoPedido = {}
            this.novoPedidoDialog = true
        },
        async salvar() {
            if (
                this.novoPedido.postGraduacao === '' ||
                this.novoPedido.telefone === 0 ||
                this.novoPedido.email === '' ||
                this.novoPedido.localPartida === '' ||
                this.novoPedido.materialTransportar === '' ||
                this.novoPedido.passageirosQnt === 0
            ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Os campos obrigatórios devem ser preenchidos corretamente.',
                });
            } else {
                
                    await axios
                    .post(`pedidoViatura`, this.novoPedido)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Serviço cadastrado',
                            showConfirmButton: false,
                            toast: true,
                            timer: 3000,
                            position: 'top-end',
                        });
                        this.novoPedidoDialog = false;
                        this.getPedidos();
                    })
                    .catch((error) => {
                        let msg = error?.response?.data?.mensagem;
                        Swal.fire({
                            icon: 'info',
                            title: 'Aviso',
                            confirmButtonColor: 'blue',
                            text: `${msg}`,
                        });
                    });
                }
                
                console.log(this.novoPedido);
            },
     
        editarPedido(item) {
            this.novoPedidoDialog = true;
            this.novoPedido = item;
            this.editaPedido = 1;
        },
        async visualizarPedido(item){
                this.novoPedido = structuredClone(item)
                this.novoPedidoDialog = true;
                this.activateFormulario = true
                this.btnLiquidar = false
                this.titleDialog = "Pedido"
        }

    }, 
        created(){

        } 

    });