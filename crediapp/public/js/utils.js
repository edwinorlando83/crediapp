function validarCedula(cad) {
    var total = 0;
    var longitud = cad.length;
  
    if (cad !== "" && (longitud === 10 || longitud === 13)) {
      for (var i = 0; i < 9; i++) {
        if (i % 2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i));
        }
      }
      total = total % 10 ? 10 - (total % 10) : 0;
      if (cad.charAt(9) == total) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  
  function validarNumeroFactura(numfac) {
    var mensaje = "El número de la factura debe ser, por ejemplo:  001-011-000000001";
    if (numfac.length != 17)
      return mensaje;
      else{
   
           if( numfac.charAt(3)!='-' && numfac.charAt(7) =='-' )
           return mensaje;
           else
           {
             return 'OK';
           }
      }
  }
  
  function controlSoloNumeroEntero(control){
    if (control.$input!=undefined)
    {
      control.$input.keydown(function( e ) {
        return soloNumerosEnteros(e);
      });
    }
  }
  
  function controlSoloNumeroEntero_MaxDig(control, maxDigitos){
    if (control.$input!=undefined)
    {
      control.$input.keydown(function( e ) {
        return soloNumerosEnteros_MaxDig(e, maxDigitos);
      });
    }
  }
  
  function emailFormat(control){
    if (control.$input!=undefined)
    {
      control.$input.inputmask("*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]");
    }
  }
  
  function controlSoloNumero(control){
    if (control.$input!=undefined)
    {
      control.$input.keydown(function( e ) {
        return soloNumeros(e);
      });
    }
  }
  
  //Permite la validación de entrada de solo números en un input dado
  function soloNumerosEnteros( e ) {
    var key = e.charCode || e.keyCode || 0;
    return (
        key == 8 || 
        key == 9 ||
        key == 13 ||
        key == 46 ||
        key == 110 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
  }
  
  /**
   * 
   * @param {Evento del cual se dispara el codigo de la tecla presionada} e 
   * @param {Número máximo de dígitos} maxDigitos 
   */
  function soloNumerosEnteros_MaxDig(e, maxDigitos) {
    var key = e.charCode || e.keyCode || 0;
  
    if(key == 8 || 
      key == 9 ||
      key == 13 ||
      key == 46 ||
      key == 110)
    {
      return true;
    }
    else{
      var valRetorno = (
        key == 8 || 
        key == 9 ||
        key == 13 ||
        key == 46 ||
        key == 110 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
      if(valRetorno && e.target.value!=null && e.target.value!="")
      {
        valRetorno = e.target.value.length < maxDigitos;
      }
      return valRetorno;
    }
  }
  
  function soloNumeros( e ) {
    var key = e.charCode || e.keyCode || 0;
    
    return (
        key == 8 || 
        key == 9 ||
        key == 13 ||
        key == 46 ||
        key == 110 ||
        key == 190 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
  }
  
  function getCursorPos (el) {
    var pos = 0;
    if('selectionStart' in el[0]) {
      pos = el[0].selectionStart;
    }
    return pos;
  }
  function setCursorPos (el) {
    if('selectionStart' in el[0]) {
      el[0].selectionStart = el[0].selectionStart+1;
    }
  }
  
  
  function soloDate( e , control) {
    var key = e.charCode || e.keyCode || 0;
      if(e.shiftKey)
    {
      return false;
    }
    if(key == 8 || 
      key == 9 ||
      key == 13 ||
      key == 46 ||
      key == 110)
    {
      return true;
    }
  
    var valRetorno = (
      key == 189 ||
      (key >= 35 && key <= 40) ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105));
    
    if(valRetorno == false)
    {
      return valRetorno;
    }
    else{
      var curPos = getCursorPos(control);
      var txt = control[0].value;
      if(control[0].value.length >9)
      {
        return false;
      }
      else if(curPos>0)
      {
        var aux=txt.substring(curPos-1, curPos);
        if(aux=="-" && key == 189)
        {
          return false;
        }
        //Si ya tengo dos letras antes y no está el guion colocar un guión
        else{
          /*var fecha = txt.split("-");
          if(fecha.length>0)
          {
            if(fecha.length > 2)
            {
              
            }
            else if(key != 189 && fecha.length>1 && fecha[1].length>1){
              txt = txt+"-";
              control.val(txt);
              setCursorPos(control);
            }
            else if(key != 189 && fecha.length>0 && fecha[0].length>1){
              txt = txt+"-";
              control.val(txt);
              setCursorPos(control);
            }
          }
          */
          if(key == 189 && txt.includes('-'))
          {
            var numGuion = txt.split('-').length;
            if( numGuion > 2)
            {
              return false
            }
            else
              return valRetorno;
          }
          else{
            return valRetorno;  
          }
        }
      }
      else if(key == 189)
      {
        return false;
      }
      else
      {
        return valRetorno;
      }
    }
  }
  
  function setDateInputFormat(control){
    if(control.$input != undefined)
    {
      control.$input.attr('placeholder',"dd-mm-yyyy");
      control.$input.inputmask("99-99-9999");
      // control.$input.keydown(function( e ) {
      //     return soloDate(e, control.$input);
      // });
    }
  }
  
  function getCurrentDateDDMMYYYY(){
    const o_date = new Intl.DateTimeFormat;
    const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
    const m_date = o_date.formatToParts().reduce(f_date, {});
    var dateStr = m_date.year + '-' + m_date.month + '-' + m_date.day;
    return dateStr;
  }
  
  function createTabEnterEvent(currentControl, nextControl){
    if(currentControl.$input!=undefined && nextControl.$input!=undefined)
    {
      currentControl.$input.keydown(function(event) {
        if (event.shiftKey==false){
          var key = event.keyCode || event.charCode || 0;    
          if (key == 9 || key == 13) {
            event.preventDefault();
            nextControl.$input.focus();
            return false;
          }
          else{
            return true;
          }
        }
      });
      nextControl.$input.keydown(function(event) {
        var key = event.keyCode || event.charCode || 0;    
        if (event.shiftKey && (key == 9 || key == 13)) {
          event.preventDefault();
          currentControl.$input.focus();
          return false;
        }
        else{
          return true;
        }
      });
    }
  }