const {Component} = React;
const {render} = ReactDOM;

const root = document.querySelector("#root")

const Products = ({products}) => {
    const lis = products.map(product =>
        React.createElement('li', { key: product.id }, `${product.name} -  ${product.description}`)
    );
    return React.createElement('ul', null, lis);
}

const Companies = ({companies}) => {
    const lis = companies.map(company => 
        React.createElement("li", {key: company.id}, `${company.name}`)
        )
    return React.createElement("ul", null, lis)
}

class App extends Component{
    constructor(){
        super();
        this.state = {
            products: [],
            companies: [], 
            view: "butt"
        }
    }
    componentDidMount(){
        const url = 'https://acme-users-api-rev.herokuapp.com/api';
        axios.all([
            axios.get(`${url}/products`),
            axios.get(`${url}/companies`),
        ]).then(axios.spread((products, companies) => {
            this.setState({
                products: products.data,
                companies: companies.data
            });
        }));
    }

    render(){
        const {products, companies} = this.state;
        const companiesPage = React.createElement(Companies, {companies})
        const productPage = React.createElement(Products, {products});
        return React.createElement('div', null, productPage, companiesPage); 
    }
}

render(React.createElement(App), root)
