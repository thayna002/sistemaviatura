jsreport.serverUrl = `http://10.1.32.187:443`;
var app = new Vue ({
    el: '#app', 
    vuetify: new Vuetify({}), 
    data: {
        dataTable: {
            headers: [
                { text: 'NIP', value: 'nip' },
                { text: 'Graduação', value: 'graduacaoMotorista' },
                { text: 'Nome de Guerra', value: 'nomeGuerraMotorista' },
                { text: 'CNH', value: 'cnhClasse' },
                { text: 'AÇÕES', value: 'actions' }
            ], 
            items: [], 
            itemsfiltrados: [], 
            motorista: {}
            
        },
        search: null ,
        obrigatorio: [
            v => !!v || "Campo Obrigatório",
        ],
        modoEdicao: false, 
        modoVisualizacao: false, 
        novoMotorista: {}, 
        pedido: {}, 
        clienteBnic: {},
        novoDialog: false, 
        options: {  // Instanciando a variável options
            page: 1,  // Defina os valores iniciais desejados para page e itemsPerPage
            itemsPerPage: 10 // Por exemplo, page = 1 e itemsPerPage = 10
          }, 
          itemsPerPage: [10, 20, 30]
    }, 
    mounted(){
        this.getMotorista() 

    }, 

    computed: {

    }, 
    watch: {
         
    }, 
    methods: {
        async getMotorista() {
            let {  page, itemsPerPage} = this.options
            page = page ? page : 1
                await axios.get(`motoristas/todosMotoristas/?page=${page - 1}&size=${itemsPerPage}`).then((resp) => {
                    this.dataTable.totalItens = resp.data.totalElements
                    this.dataTable.itemsPerPage = resp.data.size
                    this.dataTable.dataTablePage = resp.data.pageable.pageNumber +1
                    this.motorista = resp.data.content
                    this.dataTable.items = resp.data.content 
                    console.log( this.dataTable.items)
                }).finally(()=> this.dataTable.loading = false)


        },    
        // async getClienteBnic(){
        //     await axios.get(`http://10.1.32.86/FATURA/clientesbnic`).then((resp)=>{
        //         this.clienteBnic = resp.data; 
        //         // console.log(this.cliente)
        //     })

        // },        
        novo() {
           this.novoMotorista = {}
            this.novoDialog = true   
            this.$refs?.form?.resetValidation()
            this.modoEdicao = false
            this.modoVisualizacao = false 
        },
        async salvar() {
            this.novoMotorista.postGraduacao = this.novoMotorista.postGraduacao.toUpperCase();
            this.novoMotorista.nomeGuerra = this.novoMotorista.nomeGuerra.toUpperCase();
            this.novoMotorista.localPartida = this.novoMotorista.localPartida.toUpperCase();
            this.novoMotorista.destino = this.novoMotorista.destino.toUpperCase();
            this.novoMotorista.dataInclusao = new Date();
            this.novoMotorista.motoristaEsperar = this.novoMotorista.motoristaEsperar.toUpperCase(); 
            this.novoMotorista.status = "Em Análise";

            if (
                this.novoMotorista.postGraduacao === '' ||
                this.novoMotorista.telefone === 0 ||
                this.novoMotorista.email === '' ||
                this.novoMotorista.localPartida === '' ||
                this.novoMotorista.materialTransportar === '' ||
                this.novoMotorista.passageirosQnt === 0
            ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Os campos obrigatórios devem ser preenchidos corretamente.',
                });
            } else {
                
                    await axios
                    .post(`pedidoViatura`, this.novoMotorista)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Serviço cadastrado',
                            showConfirmButton: false,
                            toast: true,
                            timer: 3000,
                            position: 'top-end',
                        });
                        this.novoDialog = false;
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
                
                console.log(this.novoMotorista);
            },     
        editarMotorista(item) {
            this.modoEdicao = true;
            this.modoVisualizacao = false;
            this.novoDialog = true;
            this.novoMotorista = item;
            

        },
        async visualizarMotorista(item){
                this.modoVisualizacao = true;
                this.modoEdicao = false; 
                this.novoMotorista = structuredClone(item)
                this.novoDialog = true;
                this.activateFormulario = true
                this.btnLiquidar = false
                this.titleDialog = "Pedido"
        }, 
        async excluirMotorista(item) {
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
     
    }, 
        created(){

        } 

    });