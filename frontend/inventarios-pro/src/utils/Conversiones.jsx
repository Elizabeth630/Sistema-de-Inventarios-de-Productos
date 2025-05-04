export function ConvertirCapitalize(input){//PARA CONVERTIR LA PRIMERA LETRA A MAYUSCULA Y EL RESTO A MINUSCULA Y NO HARA DUPLICADOS EN LOS DATOS
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}