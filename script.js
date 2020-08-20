const cpf = document.querySelector("#cpf");

class ValidarCpf {
  constructor(element) {
    this.element = element;
  }
  limpar(cpf) {
    return cpf.replace(/\D/g, "");
  }
  construir(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }
  formatar(cpf) {
    const cpfLimpo = this.limpar(cpf);
    return this.construir(cpfLimpo);
  }
  validar(cpf) {
    const matchCpf = cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/g);
    return matchCpf && matchCpf[0] === cpf;
  }
  validarNaMudanca(cpfElement) {
    if (this.validar(cpfElement.value)) {
      cpfElement.value = this.formatar(cpfElement.value);
      cpfElement.classList.add("ok");
      cpfElement.classList.remove("erro");
      cpfElement.nextElementSibling.classList.remove("active");
    } else {
      cpfElement.classList.add("erro");
      cpfElement.classList.remove("ok");
      cpfElement.nextElementSibling.classList.add("active");
    }
  }
  adicionarEvento() {
    this.element.addEventListener("change", () => {
      // this.element faz referencia ao this.element diretamente incluido no constructor.Retorna o input cpf
      this.validarNaMudanca(this.element); // ativa o metodo de validar no campo do input presente no constructor.
    });
  }
  adicionarErroSpan() {
    const errorElement = document.createElement("span");
    errorElement.classList.add("erroText");
    errorElement.innerText = "CPF inválido";
    this.element.parentElement.insertBefore(
      errorElement,
      this.element.nextElementSibling,
    );
  }

  iniciar() {
    this.adicionarEvento();
    this.adicionarErroSpan();
    return this;
  }
}

const validarCpf = new ValidarCpf(cpf).iniciar();
