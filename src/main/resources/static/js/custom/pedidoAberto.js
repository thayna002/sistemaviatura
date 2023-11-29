var app = new Vue ({
    el: '#app', 
    vuetify: new Vuetify({}), 
    data: {
        dataTablePedido: {
            headers: [
                { text: 'Responsável', value: 'responsavel' },
                { text: 'Tel/Ramal', value: 'telefone' },
                { text: 'Local de Partida', value: 'localPartida' },
                { text: 'Destino', value: 'destino' },
                { text: 'Material a Transportar', value: 'passageirosQnt' },
                // { text: 'Descrição Serviço', value: 'observacoes' },
                { text: 'Quantidade Passageiros', value: 'passageirosQnt' },
                { text: 'STATUS', value: 'status' },
                { text: 'Data Viagem', value: 'saidadate' },
                { text: 'Motorista', value: 'motorista' },
                { text: 'Viatura', value: 'modelviatura' },
                { text: 'OM', value: 'om' },
                { text: 'AÇÕES', value: 'actions' }
            ], 
            items: [], 
            itemsfiltrados: [], 
            pedidos: {}, 
            
        },
        search: null ,
        obrigatorio: [
            v => !!v || "Campo Obrigatório",
        ],
        modoEdicao: false, 
        modoVisualizacao: false, 
        novoPedido: {
            viatura: null
        }, 
        pedido: {}, 
        novoPedidoDialog: false, 
        options: {  
            page: 1,  
            itemsPerPage: 10 
          }, 
          itemsPerPage: [10, 20, 30],
          listViaturas: {}, 
          listMotoristas: {},
          viat: [], 
          clienteBnic: {}
         
    }, 
    mounted(){
        this.getPedidos()
        this.getViaturas()
        this.getMotoristas()
        this.getViaturaInfo()
        this.getClienteBnic()
    }, 
    computed: {
         
    }, 
    watch: {
 
    },
    methods: {
        async getPedidos() {
            let {  page, itemsPerPage} = this.options
             page = page ? page : 1
             await axios.get(`pedidoViatura/pedidoAberto/?page=${page - 1}&size=${itemsPerPage}`).then((resp) => {
                this.dataTablePedido.totalItens = resp.data.totalElements
                this.dataTablePedido.itemsPerPage = resp.data.size
                this.dataTablePedido.dataTablePage = resp.data.pageable.pageNumber +1
                this.pedido = resp.data.content
                this.dataTablePedido.items = resp.data.content 
                 // console.log( this.dataTablePedido.items)
            }).finally(()=> this.dataTablePedido.loading = false)
        },    
        async getViaturas(){
            await axios.get(`viatura/getViatura`).then((resp)=>{
               this.listViaturas = resp.data; 
                // console.log(this.listViaturas)
            })
        }, 
        async getMotoristas(){
            await axios.get(`motoristas/getMotoristas`).then((resp)=>{
                this.listMotoristas = resp.data; 
                // console.log(this.listMotoristas)
            })

        },
        
        getViaturaInfo: function (item) {
            console.log(item);
            // Verifica se a propriedade 'viatura' existe no item
            if (item && item.viaturas) {
                return item.viaturas.modeloViatura + ' / ' + item.viaturas.placaViatura;
            } else {
                return '';
            }
        },

        novo() {
            this.novoPedido = {}
            this.novoPedidoDialog = true   
            this.$refs?.form?.resetValidation()
            this.modoEdicao = false
            this.modoVisualizacao = false 
            },
        atualizarModeloViatura() {
            console.log('this.novoPedido.viatura:', this.novoPedido.viatura);
            const viaturaSelecionada = this.listViaturas.find(viatura => viatura.id === this.novoPedido.viatura);
            console.log('viaturaSelecionada:', viaturaSelecionada);
            this.novoPedido.modelo = viaturaSelecionada ? viaturaSelecionada.modelo : '';
            console.log('this.novoPedido.modelo:', this.novoPedido.modelo);
        },
       atualizarMotorista() {
            const motoristaSelecionado = this.listMotoristas.find(viatura => viatura.id === this.novoPedido.viatura);
            this.novoPedido.motoristaSelecionado = motoristaSelecionado ? motoristaSelecionado.nomeGuerraMotorista : '';
        },
        async salvar() {
            this.novoPedido.postGraduacao = this.novoPedido.postGraduacao.toUpperCase();
            this.novoPedido.nomeGuerra = this.novoPedido.nomeGuerra.toUpperCase();
            this.novoPedido.localPartida = this.novoPedido.localPartida.toUpperCase();
            this.novoPedido.destino = this.novoPedido.destino.toUpperCase();
            this.novoPedido.dataInclusao = new Date();
            this.novoPedido.motoristaEsperar = this.novoPedido.motoristaEsperar.toUpperCase(); 
                await axios
                 .post(`pedidoViatura`, this.novoPedido)
                 .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Pedido Atualizado',
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

                    // console.log(this.novoPedido);
                },     
            editarPedido(item) {
                this.modoEdicao = true;
                this.$refs?.form?.resetValidation()
                this.modoVisualizacao = false;
                this.novoPedidoDialog = true;
                this.novoPedido = item;

            },
            async visualizarPedido(item){
                    this.modoVisualizacao = true;
                    this.modoEdicao = false; 
                    this.novoPedido = structuredClone(item)
                    this.novoPedidoDialog = true;
                    this.activateFormulario = true
                    this.btnLiquidar = false
                    this.titleDialog = "Pedido"
            }, 
            async excluirPedido(item) {
                Swal.fire({
                title: 'Tem certeza que deseja excluir?',
                text: "Essa ação não poderá ser revertida!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.delete(`pedidoViatura/${item.id}`)
                        .then((resp) => {
                            Swal.fire({
                            icon: 'info',
                            title: 'Fatura excluída',
                            showConfirmButton: false,
                            toast: true,
                            timer: 3000,
                            position: 'top-end'
                        })
                            this.getPedidos()
                         })
                    }
                })
            },
            atualizarModeloViatura() {
                const viaturaSelecionada = this.listViaturas.find(viatura => viatura.id === this.novoPedido.viatura);
                if (viaturaSelecionada) {
                    this.novoPedido.modelo = viaturaSelecionada.id;
                    this.novoPedido.placa = viaturaSelecionada.placaViatura;
                } else {
                    this.novoPedido.modelo = '';
                    this.novoPedido.placa = '';
                }
            },
            formatarData(data) {
                const dataObj = new Date(data);
                const dia = String(dataObj.getDate()).padStart(2, '0');
                const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // O mês começa a partir de 0
                const ano = dataObj.getFullYear();
            
                return `${dia}/${mes}/${ano}`;
              }, 
              async getClienteBnic(){
                await axios.get(`http://10.1.32.86/FATURA/clientesbnic`).then((resp)=>{
                    this.clienteBnic = resp.data; 
                    // console.log(this.cliente)
                })
    
            }
    }, 
    created(){

    } 

    });