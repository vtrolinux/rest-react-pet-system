import Input from "../../form/Input"

function Register(){
    function handleOnChange(e) {
        
    }
    return (
        <section>
            <h1>Register</h1>
            <form>
            <Input
                text='Nome'
                type='text'
                name='name'
                placeholder='Digite o seu nome'
                handleOnChange={handleOnChange}
            />
            <Input
                text='Telefone'
                type='text'
                name='phone'
                placeholder='Telefone de contato'
                handleOnChange={handleOnChange}
            />
            <Input
                text='E-mail'
                type='email'
                name='email'
                placeholder='Informe seu email'
                handleOnChange={handleOnChange}
            />
            <Input
                text='senha'
                type='password'
                name='password'
                placeholder='defina a sua senha'
                handleOnChange={handleOnChange}
            />
            <Input
                text='confirmaçao de senha'
                type='password'
                name='confirmpassword'
                placeholder='confirme sua senha'
                handleOnChange={handleOnChange}
            />
            <input type='submit' value='Cadastrar'/>
            </form>
        </section>
    )
}
export default Register