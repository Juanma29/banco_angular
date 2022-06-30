export function obtenerLocalizacion(callback : Function) {

    navigator.geolocation.getCurrentPosition((position) => {
     const latitude = position.coords.latitude;
     const longitud = position.coords.longitude;
  
    }, (error) => {
      console.log(error);
    });
  
  }
