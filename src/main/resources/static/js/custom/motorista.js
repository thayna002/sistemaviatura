jsreport.serverUrl = `http://10.1.32.187:443`;
var app = new Vue({
    el: '#app',
    vuetify: new Vuetify({}),
    data: {
        dataTable: {
            headers: [
                { text: 'NIP', value: 'id' },
                { text: 'Graduação', value: 'graduacaoMotorista' },
                { text: 'Nome de Guerra', value: 'nomeGuerraMotorista' },
                { text: 'CNH', value: 'cnhClasse' },
                { text: 'AÇÕES', value: 'actions' }
            ],
            items: [],
            itemsfiltrados: [],
            motorista: {}

        },
        search: null,
        obrigatorio: [
            v => !!v || "Campo Obrigatório",
        ],
        modoEdicao: false,
        modoVisualizacao: false,
        novoMotorista: {},
        pedido: {},
        clienteBnic: {},
        nip:0,
        novoDialog: false,
        options: {  // Instanciando a variável options
            page: 1,  // Defina os valores iniciais desejados para page e itemsPerPage
            itemsPerPage: 10 // Por exemplo, page = 1 e itemsPerPage = 10
        },
        itemsPerPage: [10, 20, 30]
    },
    mounted() {
        this.getMotorista()

    },

    computed: {


    },
    watch: {
        options:{
            handler(){
                this.pesquisa()
            }, 
            deep: true
        }

    },
    methods: {
        async getMotorista() {
            let { page, itemsPerPage } = this.options;
            page = page ? page : 1;
            await axios.get(`motoristas/todosMotoristas/?page=${page - 1}&size=${itemsPerPage}`).then((resp) => {
                this.dataTable.totalItens = resp.data.totalElements
                this.dataTable.itemsPerPage = resp.data.size
                this.dataTable.dataTablePage = resp.data.pageable.pageNumber + 1
                this.motorista = resp.data.content
                this.dataTable.items = resp.data.content
                console.log(this.dataTable.items)
            }).finally(() => this.dataTable.loading = false)


        },
        pesquisa(item) {
            this.loading = true
            this.getMotorista(item)
          },
      
        novo() {
            this.novoMotorista = {}
            this.novoDialog = true
            this.$refs?.form?.resetValidation()
            this.modoEdicao = false
            this.modoVisualizacao = false
        },
        async salvar() {

            try {
                this.novoMotorista.nomeGuerraMotorista = this.novoMotorista.nomeGuerraMotorista.toUpperCase();
                this.novoMotorista.nomeCompletoMotorista = this.novoMotorista.nomeCompletoMotorista.toUpperCase();


                if (
                    this.novoMotorista.nip === 0 ||
                    !this.novoMotorista.graduacaoMotorista ||
                    this.novoMotorista.nomeCompletoMotorista === '' ||
                    this.novoMotorista.nomeGuerraMotorista === '' ||
                    this.novoMotorista.cnhClasse === ''
                ) {
                    throw new Error('Os campos obrigatórios devem ser preenchidos corretamente.');
                }

                // Remover a máscara do NIP e converter para número
                this.novoMotorista.nip = parseInt(this.novoMotorista.nip.replace(/\D/g, ''), 10);

                // Converter o array cnhClasse em uma string

                let cnh = ''
                this.novoMotorista.cnhClasse.forEach((c) => {
                    // console.log(c)
                    cnh += c + " "
                })
                this.novoMotorista.cnhClasse = cnh.trim()

                await axios.post(`motoristas`, this.novoMotorista);
                // return
                Swal.fire({
                    icon: 'success',
                    title: 'Serviço cadastrado',
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                    position: 'top-end',
                });

                this.novoDialog = false;
                this.getMotorista();
            } catch (error) {
                let msg = error.response?.data?.mensagem || 'Ocorreu um erro durante a solicitação.';
                Swal.fire({
                    icon: 'info',
                    title: 'Aviso',
                    confirmButtonColor: 'blue',
                    text: `${msg}`,
                });
            }
        },
        editarMotorista(item) {
            this.modoEdicao = true;
            this.modoVisualizacao = false;
            this.novoDialog = true;
            this.$refs?.form?.resetValidation()
            this.novoMotorista = JSON.parse(JSON.stringify(item));
            this.novoMotorista.graduacaoMotorista = item.graduacaoMotorista.trim()
            this.novoMotorista.cnhClasse = item.cnhClasse.trim().split(" ")
         },
        async visualizarMotorista(item) {
            this.modoVisualizacao = true;
            this.modoEdicao = false;
            this.novoMotorista = structuredClone(item)
            this.novoDialog = true;
            this.activateFormulario = true
            this.btnLiquidar = false
            this.titleDialog = "Motorista"
            this.novoMotorista.graduacaoMotorista = item.graduacaoMotorista.trim()
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
                    await axios.delete(`motoristas/${item.id}`)
                        .then((resp) => {
                            Swal.fire({
                                icon: 'info',
                                title: 'Motorista excluída',
                                showConfirmButton: false,
                                toast: true,
                                timer: 3000,
                                position: 'top-end'
                            })
                            this.getMotorista()
                        })
                }
            })
        },
        formatarNIP(nip) {
            // Verificar se nip é um número
            if (typeof nip !== 'number') {
              return '';
            }
        
            // Converter nip para string e remover caracteres não numéricos
            const nipNumerico = nip.toString().replace(/\D/g, '');
            // Formatar o NIP como XX.XXXX.XX
            return nipNumerico.replace(/(\d{2})(\d{4})(\d{2})/, '$1.$2.$3');
          },

    },

    created() {

    }

});