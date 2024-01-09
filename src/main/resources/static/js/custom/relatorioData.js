jsreport.serverUrl = `http://10.1.32.187:443`;
var app = new Vue({
    el: '#app',
    vuetify: new Vuetify({}),
    data: {
        dataTablePedido: {
            headers: [
                { text: 'AÇÕES', value: 'actions' },
                { text: 'Id', value: 'id' },
                { text: 'Data de inclusao', value: 'datainclusao' },
                { text: 'Posto/Grad - Nome de Guerra', value: 'responsavel' },
                { text: 'Tel/Ramal', value: 'telefone' },
                { text: 'Local de Partida', value: 'localPartida' },
                { text: 'Destino', value: 'destino' },
                { text: 'STATUS', value: 'status' },
                { text: 'Data da Viagem', value: 'saidadate' },
                { text: 'Horário de Saída', value: 'saidahora' },
                { text: 'Data de retorno', value: 'retornodate' },
                { text: 'Horário de Retorno', value: 'retornohora' },
                { text: 'Observações', value: 'observacoes' },
                { text: 'Motorista', value: 'motorista' },
                { text: 'Modelo do Veículo', value: 'viatura' },
                { text: 'Hodômetro Saída', value: 'hodometroSaida' },
                { text: 'Hodômetro Regresso', value: 'hodometroRegresso' },
                { text: 'Gerar PDF', value: 'gerarpdf' },
                { text: 'OM', value: 'om' }
            ],
            items: [],
            itemsfiltrados: [],
            pedidos: {}

        },
        search: '',
        obrigatorio: [
            v => !!v || "Campo Obrigatório",
        ],
        modoEdicao: false,
        modoVisualizacao: false,
        novoPedido: {},
        pedido: {},
        clienteBnic: {},
        novoPedidoDialog: false,
        options: {  // Instanciando a variável options
            page: 1,  // Defina os valores iniciais desejados para page e itemsPerPage
            itemsPerPage: 10 // Por exemplo, page = 1 e itemsPerPage = 10
        },
        itemsPerPage: [10, 20, 30]
    },
    mounted() {
        this.getPedidos(),
            this.getClienteBnic()
    },

    computed: {

    },
    watch: {

    },
    methods: {
        async getPedidos() {

            let { page, itemsPerPage } = this.options
            page = page ? page : 1
            await axios.get(`pedidoViatura/pedidosdoDia/?page=${page - 1}&size=${itemsPerPage}`).then((resp) => {
                this.dataTablePedido.totalItens = resp.data.totalElements
                this.dataTablePedido.itemsPerPage = resp.data.size
                this.dataTablePedido.dataTablePage = resp.data.pageable.pageNumber + 1
                this.pedido = resp.data.content
                this.dataTablePedido.items = resp.data.content
                console.log(this.dataTablePedido.items)
                // console.log((new Intl.DateTimeFormat('pt-BR').format(this.pedido.saidaDate)))
            }).finally(() => this.dataTablePedido.loading = false)


        },
        async getClienteBnic() {
            await axios.get(`http://10.1.32.30/FATURA/clientesbnic`).then((resp) => {
                this.clienteBnic = resp.data;
                // console.log(this.cliente)
            })

        },
    

        async salvar() {
            this.novoPedido.postGraduacao = this.novoPedido.postGraduacao.toUpperCase();
            this.novoPedido.nomeGuerra = this.novoPedido.nomeGuerra.toUpperCase();
            this.novoPedido.localPartida = this.novoPedido.localPartida.toUpperCase();
            this.novoPedido.destino = this.novoPedido.destino.toUpperCase();
            this.novoPedido.dataInclusao = new Date();
            this.novoPedido.status = "Em Análise";

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
            this.modoEdicao = true;
            this.modoVisualizacao = false;
            this.novoPedidoDialog = true;
            this.novoPedido = item;


        },

  
    },


    created() {

    }

});