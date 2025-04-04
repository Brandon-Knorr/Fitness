//component should be PascalCase
//multi word but singular in plurarity
//when using the component in another file, use kebab-case

const FooterComponent = {
  //data
  data: function () {
    return {};
  },

  //props Data that are passed into the component
  //can be optional or required
  //objects and arrays are passed by reference
  //primitives are passed by value
  props: {},

  //methods are usually events triggered by v-on
  methods: {},

  //computed properties are values that are cached and only updated when the values they depend on change
  //computed value functions need to return a value
  //Treat these like regular values that you would use in data or props
  computed: {},

  //watch properties are used to watch for changes in data
  watch: {},

  //Template is the html that will be rendered
  //it should consist of one root element
  //you can reference data, props, methods, computed properties, and watch properties using {{}}
  template: `
        <footer class="navbar fixed-bottom">
        <div class="container-fluid justify-content-center">
          <p>MyFit Journal | JavaScript 2 | Brandon Knorr | &copy;2025</p>
        </div>
      </footer>
      
`,
};

export default FooterComponent;
