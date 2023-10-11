var app = new Vue ({
    el: '#app', 
    vuetify: new Vuetify({}), 
    data: {
        dataTableTipo: {
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'TIPO', value: 'tipo' },
                { text: 'VALOR DESṔESA FIXA/H', value: 'vlDespFixaH' },
                { text: 'VALOR DESP MON KM', value: 'vlDespMonKm' },
                { text: 'AÇÕES', value: 'actions' }
            ], 
            items: [], 
            itemsfiltrados: [], 
            tipo: {}, 
            
        },
        search: null ,
        obrigatorio: [
            v => !!v || "Campo Obrigatório",
        ],
        modoEdicao: false, 
        modoVisualizacao: false, 
        novoTipo: {
            tipo: 0, 
            vlDespFixaH: 0, 
            vlDespMonKm: 0
        }, 
        novoTipoDialog: false, 
        options: {  // Instanciando a variável options
            page: 1,  // Defina os valores iniciais desejados para page e itemsPerPage
            itemsPerPage: 10 // Por exemplo, page = 1 e itemsPerPage = 10
          }, 
          itemsPerPage: [10, 20, 30]
    }, 
        mounted(){
         this.getTipos()
        }, 

        computed: {

        }, 
        watch: {
         
        }, methods: {
            async getTipos() {
                let {  page, itemsPerPage} = this.options
                page = page ? page : 1
                await axios.get(`tipoViatura/?page=${page - 1}&size=${itemsPerPage}`).then((resp) => {
                    this.dataTableTipo.totalItens = resp.data.totalElements
                    this.dataTableTipo.itemsPerPage = resp.data.size
                    if (resp.data.pageable) {
                        this.dataTableTipo.dataTablePage = resp.data.pageable.pageNumber + 1;
                      } 
                    this.tipo = resp.data.content
                    this.dataTableTipo.items = resp.data.content 
                    console.log( this.dataTableTipo.items)
                }).finally(()=> this.dataTableTipo.loading = false)


        },    
        novo() {
            this.novoTipo = {}
            this.novoTipoDialog = true   
            this.modoEdicao = false
            this.modoVisualizacao = false 
        },
        async salvar() {
            if (
                this.novoTipo.tipo === 0 ||
                this.novoTipo.vlDespFixaH === 0 ||
                this.novoTipo.vlDespMonKm === 0 
            ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Os campos obrigatórios devem ser preenchidos corretamente.',
                });
            } else {
                
                    await axios
                    .post(`tipoViatura`, this.novoTipo)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Tipo viatura cadastrado',
                            showConfirmButton: false,
                            toast: true,
                            timer: 3000,
                            position: 'top-end',
                        });
                        this.novoTipoDialog = false;
                        this.getTipos();
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
                
                console.log(this.novoTipo);
            },     
        editar(item) {
            this.modoEdicao = true;
            this.modoVisualizacao = false;
            this.novoTipoDialog = true;
            this.novoTipo = item;
  
        },
        async visualizar(item){
                this.modoVisualizacao = true;
                this.modoEdicao = false; 
                this.novoTipo = structuredClone(item)
                this.novoTipoDialog = true;
                this.activateFormulario = true
                // this.btnLiquidar = false
                this.titleDialog = "Tipo"
        }, 

        async excluir(item) {
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
                await axios.delete(`tipoViatura/${item.id}`)
                  .then((resp) => {
                    Swal.fire({
                      icon: 'info',
                      title: 'Fatura excluída',
                      showConfirmButton: false,
                      toast: true,
                      timer: 3000,
                      position: 'top-end'
                    })
                    this.getTipos()
                  })
              }
            })
          },
        //   formatarData(data) {
        //     const dataObj = new Date(data);
        //     const dia = String(dataObj.getDate()).padStart(2, '0');
        //     const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // O mês começa a partir de 0
        //     const ano = dataObj.getFullYear();
        
        //     return `${dia}/${mes}/${ano}`;
        //   }
      
    }, 
        created(){

        } 

    });