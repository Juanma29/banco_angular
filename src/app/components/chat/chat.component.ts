import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { MensajeChat } from '../../modelos/mensaje-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  mensajes: MensajeChat[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {

    this.chatService.escucharMensajes((mensaje: MensajeChat) => {
      console.log(mensaje);

      const fechaActual = new Date();

      let minutos = fechaActual.getMinutes().toString();
      if(minutos.length === 1) {
        minutos = '0' + minutos;
      }

      mensaje.hora = `${fechaActual.getHours()}:${minutos}`;

      this.mensajes.push(mensaje);
    });
  }

  onMensaje(mensajeInput: HTMLInputElement){

    const mensaje = mensajeInput.value;
    if (!mensaje){
      return;
    }

    const MensajeChat: MensajeChat  = {
      usuario: 'juanma',
      mensaje,
    }
// envía el mensaje al servicio websocket
this.chatService.enviar(MensajeChat);
mensajeInput.value = ''; // borra el contenido el input del mensaje
}

onEnviarMensajeEnter(
event: KeyboardEvent,
mensajeInput: HTMLInputElement
) {

// el usuario ha pulsado Enter en la caja de texto del password. Ahora ejecutamos el mismo código del método loginGestor
if(event.key === 'Enter') {
  this.onMensaje(mensajeInput);
}
}

  onBorrar() {
    this.mensajes = [];
  }
}