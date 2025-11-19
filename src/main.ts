import './style.css'

const leftImg = document.getElementById("leftImage") as HTMLImageElement;
const rightImg = document.getElementById("rightImage") as HTMLImageElement;

interface WSMessage {
  type: "left" | "right";
  image: string; // base64
}

const ws = new WebSocket("ws://localhost:3001");

ws.onmessage = event => {
  const data: WSMessage = JSON.parse(event.data);

  const src = `data:image/jpeg;base64,${data.image}`;

  if (data.type === "left") {
    leftImg.src = src;
  } else if (data.type === "right") {
    rightImg.src = src;
  }
};