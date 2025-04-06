type UserInformation = {
        email: string;
        password: string;
        
    }

function validateUser(values: UserInformation){

    const errors = {
        email : '',
        password : '', 
      };
    
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)){
        errors.email = '올바른 형식의 이메일이 아닙니다.';
    
      }
    
      if(!(values.password.length >= 8 && values.password.length<20)){
        errors.password = '비밀번호는 8에서 20자 사이';
    
      }
    
      return errors;

}
  
function validateLogin(values:UserInformation){
    
  
    return validateUser(values);
  
  }

  function validateSigngup(values: UserInformation & {passwordConfirm: string}){

    const errors = validateUser(values);
    const singupErrors = {...errors, passwordConfirm:''};
    
      if(values.password !== values.passwordConfirm){
        singupErrors.passwordConfirm = '비밀번호가 일치하지 않음'
      }

      return singupErrors;
  }

  export {validateLogin, validateSigngup};