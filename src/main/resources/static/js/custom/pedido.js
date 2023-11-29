jsreport.serverUrl = `http://10.1.32.187:443`;
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
                // { text: 'Descrição Serviço', value: 'observacoes' },
                { text: 'Quantidade Passageiros', value: 'passageirosQnt' },
                { text: 'Motorista Espera', value: 'motoristaEsperar' },
                { text: 'STATUS', value: 'status' },
                { text: 'Data Viagem', value: 'saidadate' },
                { text: 'Motorista', value: 'motorista' },
                { text: 'Viatura', value: 'viatura' },
                { text: 'AÇÕES', value: 'actions' }
            ], 
            items: [], 
            itemsfiltrados: [], 
            pedidos: {}
            
        },
        search: null ,
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
    mounted(){
        this.getPedidos(), 
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
                await axios.get(`pedidoViatura/todosPedidos/?page=${page - 1}&size=${itemsPerPage}`).then((resp) => {
                    this.dataTablePedido.totalItens = resp.data.totalElements
                    this.dataTablePedido.itemsPerPage = resp.data.size
                    this.dataTablePedido.dataTablePage = resp.data.pageable.pageNumber +1
                    this.pedido = resp.data.content
                    this.dataTablePedido.items = resp.data.content 
                    console.log( this.dataTablePedido.items)
                }).finally(()=> this.dataTablePedido.loading = false)


        },    
        async getClienteBnic(){
            await axios.get(`http://10.1.32.30/FATURA/clientesbnic`).then((resp)=>{
                this.clienteBnic = resp.data; 
                // console.log(this.cliente)
            })

        },        
        novo() {
           this.novoPedido = {}
            this.novoPedidoDialog = true   
            this.$refs?.form?.resetValidation()
            this.modoEdicao = false
            this.modoVisualizacao = false 
        },
        async salvar() {
            this.novoPedido.postGraduacao = this.novoPedido.postGraduacao.toUpperCase();
            this.novoPedido.nomeGuerra = this.novoPedido.nomeGuerra.toUpperCase();
            this.novoPedido.localPartida = this.novoPedido.localPartida.toUpperCase();
            this.novoPedido.destino = this.novoPedido.destino.toUpperCase();
            this.novoPedido.dataInclusao = new Date();
            this.novoPedido.motoristaEsperar = this.novoPedido.motoristaEsperar.toUpperCase(); 
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
           formatarData(data) {
            const dataObj = new Date(data);
            const dia = String(dataObj.getDate()).padStart(2, '0');
            const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // O mês começa a partir de 0
            const ano = dataObj.getFullYear();
        
            return `${dia}/${mes}/${ano}`;
          }
      
    }, 
        created(){

        } 

    });