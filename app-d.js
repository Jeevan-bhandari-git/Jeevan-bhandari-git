class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            userButton: document.querySelector('.chatbox__messages'),
            eusrButton: document.querySelector('.chatbox__messages')
        }
        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton, userButton, eusrButton} = this.args;
        window.value=0;
        window.nuser=0;
        window.euser=0;
        window.margq=0;
        window.margr=0;

        window.evalue=0;
        openButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        userButton.addEventListener('click', () => this.newUser(chatBox))
        eusrButton.addEventListener('click', () => this.existUser(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
                this.chatbox__messages.scrollTo(0,-1000)
            }
        })
    }

    newUser(chatbox) {
      if(window.nuser===0) {
        if(chatbox=='Y') {

          let margm10 = '<div class="row d-flex"  style="color:#ffffff; margin-top:0">  New User'
          margm10 += '</div>'
          let msg10 = { name: "User", message: margm10 };
          this.messages.push(msg10);

          let margm1 = '<div class="row d-flex"  style="color:#000000">'
          margm1 += '<a> 👋 Thanks for showing interest in Marg Software. Please select your inquiry type.</a>'
          margm1 += '</div><div class="row d-flex">'
          margm1 += '<a class="cbot-btn2" href="https://www.margcompusoft.com/landingPages/billing_software.html?utm_source=Direct&utm_medium=homepage&utm_campaign=Free_Demo" target="_blank" style="color:#009900; border:1">Book Demo</a>'
          margm1 += '<a class="cbot-btn2" href="https://www.youtube.com/watch?v=VvXe7S7Z5sg" target="_blank" style="color:#006099">Watch our Videos</a>'
          margm1 += '</div><div class="row d-flex">'
          margm1 += '<a class="cbot-btn2" href="https://margcompusoft.com/marg-price-list.html" target="_blank" style="color:#660000">Pricing💰</a>'
          margm1 += '<a class="cbot-btn2" href="https://www.facebook.com/groups/margcompusoft" target="_blank" style="color:#0000FF">Join our community</a>'

          //margm1 += '<button class="cbot-btn" onclick="this.newUser()">What is Marg ERP?</button>'
          margm1 += '</div>'
          window.nuser = window.nuser+1
          let msg1 = { name: "MargBot", message: margm1 };
          this.messages.push(msg1);
          this.updateChatText(chatbox);
        }
      } else {
        window.margq = window.margq+1
      }
      if(window.margq===1) {
        let margm2 = '<div class="row d-flex" style="margin-top:-3px">'
        margm2 += '<a> For more information, visit at : </a></div><div>'
        margm2 += '<a href="https://www.margerp.com" target="_blank">www.margerp.com</a>'
        margm2 += '</div>'
        let msg2 = { name: "MargBot", message: margm2 };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
      }
    }

    existUser(chatbox) {
      if(window.euser===0) {
        if(chatbox=='Y') {
          let margm10 = '<div class="row d-flex"  style="color:#ffffff; margin-top:0">  Existing User'
          margm10 += '</div>'
          let msg10 = { name: "User", message: margm10 };
          this.messages.push(msg10);

          let margm1 = '<div class="row d-flex"  style="color:#000000; margin-top:-1px">'
          margm1 += '<a> Hello! Please enter your Registered Mobile Number or License Number.</a>'
          margm1 += '</div>'
          window.euser = window.euser+1
          let msg1 = { name: "MargBot", message: margm1 };
          this.messages.push(msg1);
          this.updateChatText(chatbox);
          //window.euser = window.euser+1
        }
      } else {
        window.margr = window.margr+1
      }
        //window.margq = window.margq+1
      //}
      if(window.margr===1) {
        let margm2 = '<div class="row d-flex">'
        margm2 += '<a> For more information, please contact Licensing department at xx xxxxxxx or vistit : </a></div><div>'
        margm2 += '<a href="https://www.margerp.com" target="_blank">www.margerp.com</a>'
        margm2 += '</div>'
        let msg2 = { name: "MargBot", message: margm2 };
        this.messages.push(msg2);

        this.updateChatText(chatbox);
        window.margr = window.margr+1
      }
    }

    toggleState(chatbox) {
        this.state = !this.state;
        if(this.state) {
          chatbox.classList.add('chatbox--active')
          if(window.value===0) {
            window.value = window.value+1;

            fetch('http://127.0.0.1:5000/wishme', {
                method: 'POST',
                body: JSON.stringify({ message: "" }),
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
              })
              .then(r => r.json())
              .then(r => {
                //let msg2 = { name: "MargBot", message: r.greets };
                //this.messages.push(msg2);
                let margm2 = "Hi​! "+ r.greets + " I am a Bot, Your virtual assistant."
                let msg2 = { name: "MargBot", message: margm2 };
                this.messages.push(msg2);

                //this.messages.push(msg2a);
                let margmT = '<div class="row d-flex" style="color:#000000; margin-top:-1px">'
                margmT += '<a> Happy to help you explore some interesting things! How about starting with one of the below ones? </a>'
                margmT += '</div><div class="row d-flex">'
                margmT += '<button class="cbot-btn" onclick="myNewUser()">New User</button> '
                margmT += '<button class="cbot-btn" onclick="myExistUser()">Existing User</button>'
                margmT += '</div><div class="row d-flex">'
                margmT += '<a> For more information, visit at : </a></div><div>'
                margmT += '<a href="https://www.margerp.com" target="_blank">www.margerp.com</a>'
                margmT += '</div>'
                let msgT = { name: "MargBot", message: margmT };
                this.messages.push(msgT);
                //
                this.updateChatText(chatbox)
            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
              });

          }
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }
        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        var val = text1
        if (/^\d{4}$/.test(val) | /^\d{5}$/.test(val) | /^\d{6}$/.test(val) | /^\d{7}$/.test(val) | /^\d{10}$/.test(val)) {
          let margmT = '<div class="row d-flex" style="color:#000000">'
          margmT += '<a> Welcome back N.V.R.DISTRIBUTORS.</a>'
          margmT += '</div><div class="row d-flex">'
          margmT += '<a>Let me know how may I assist you? Please type keyword eg, Update Software, Registration, licence verification, Create Sale Bill, GST Return, Sale Report, Bill format etc.</a>'
          margmT += '</div>'
          let msgT = { name: "MargBot", message: margmT };
          this.messages.push(msgT);
          this.updateChatText(chatbox)
          textField.value = ''

          //*****
          var request = new XMLHttpRequest()
          request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
          request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response)
            if (request.status >= 200 && request.status < 400) {
              data.forEach((movie) => {
                //console.log(movie.title)

                //*const card = document.createElement('div')
                //*card.setAttribute('class', 'card')
                const h1 = document.createElement('h1')
                h1.textContent = movie.title

                const p = document.createElement('p')
                movie.description = movie.description.substring(0, 300)
                p.textContent = `${movie.description}...`

                //alert(h1.textContent);
                //alert(p.textContent);
                let mname = h1.textContent;

                //*container.appendChild(card)
                //*card.appendChild(h1)
                //*card.appendChild(p)
                let margm2 = " 🤖 "+ mname + ""
                //alert(margm2)
                if(mname !='') {
                  let msg2 = { name: "MargBot", message: margm2 };
                  alert(msg2['message'])
                  chatbox.messages.push(msg2);
                  chatbox.updateChatText(chatbox)
                  textField.value = ''
                }


              //})
              })



            } else {
              console.log('error')
            }
          }
          request.send()
          //*****


          return false
        }
            // value is ok, use it
        //} else {
          //  alert("Invalid number; must be ten digits")
            //number.focus()
            //return false
        //}


        //fetch('http://127.0.0.1:5000/predict', {
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "MargBot", message:  " 🤖 "+r.answer };
            let msgNon = msg2['message']
            //text1.length<3
            //alert(text1)
            if(msg2['message']==" 🤖 "+"noans" | msg2['message']=="noans," | msg2['message']== "Perhaps I didn’t understand your question correctly.") {
              msg2 = { name: "MargBot", message: "Perhaps I didn’t understand your question correctly. If you could please rephrase your question" }
            } else {
              this.messages.push(msg2);
            }

            let msgNot = msg2['message'];
            //alert(msgNot)
            //alert(msgNon)
            if(msgNot == "Perhaps I didn’t understand your question correctly. If you could please rephrase your question" | msgNon == "noans") {
              if(msgNot == "Perhaps I didn’t understand your question correctly. If you could please rephrase your question" ) {
                fetch('http://127.0.0.1:5000/g1bot', {
                    method: 'POST',
                    body: JSON.stringify({ message: text1 }),
                    mode: 'cors',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                  })
                  .then(r => r.json())
                  .then(r => {
                    //let msg2 = { name: "MargBot", message: r.greets };
                    //this.messages.push(msg2);
                    //alert(r.botg)
                    let margm2 = " 🤖 "+ r.botg + ""
                    //alert(margm2)
                    if(r.botg !='') {
                      let msg2 = { name: "MargBot", message: margm2 };
                      this.messages.push(msg2);
                      textField.value = ''
                    }
                    //
                    if(r.botg =='') {
                      let margmT = '<div class="row d-flex" style="color:#000000">'
                      margmT += '<a> Perhaps I didn’t understand your question correctly. Select the topic or write your question below.</a>'
                      margmT += '</div><div class="row d-flex">'
                      margmT += '<a class="cbot-btn" href="https://www.margcompusoft.com/landingPages/billing_software.html?utm_source=Direct&utm_medium=homepage&utm_campaign=Free_Demo" target="_blank" style="color:#0000FF">Book Demo</a>'
                      margmT += '<a class="cbot-btn" href="https://www.youtube.com/watch?v=VvXe7S7Z5sg" target="_blank" style="color:#0000FF">Watch our Videos</a>'
                      margmT += '</div><div class="row d-flex">'
                      margmT += '<a class="cbot-btn" href="https://margcompusoft.com/marg-price-list.html" target="_blank" style="color:#0000FF">Pricing 💰</a>'
                      margmT += '<a class="cbot-btn" href="https://www.facebook.com/groups/margcompusoft" target="_blank" style="color:#0000FF">Join our community</a>'
                      margmT += '</div><div class="row d-flex">'
                      margmT += '<a> For more information, visit at : </a></div><div>'
                      margmT += '<a href="https://www.margerp.com" target="_blank">www.margerp.com</a>'
                      margmT += '</div>'
                      let msgT = { name: "MargBot", message: margmT };
                      this.messages.push(msgT);
                    }
                    //
                    this.updateChatText(chatbox)
                    textField.value = ''
                }).catch((error) => {
                    console.error('Error:', error);
                    this.updateChatText(chatbox)
                    textField.value = ''
                  });
              }

              if(!r.botg()) {
                let margmT = '<div class="row d-flex" style="color:#000000">'
                margmT += '<a> If you could please rephrase your question or pick an option from below 👇</a>'
                margmT += '</div><div class="row d-flex">'
                margmT += '<a class="cbot-btn" href="https://www.margcompusoft.com/landingPages/billing_software.html?utm_source=Direct&utm_medium=homepage&utm_campaign=Free_Demo" target="_blank" style="color:#0000FF">Book Demo</a>'
                margmT += '<a class="cbot-btn" href="https://www.youtube.com/watch?v=VvXe7S7Z5sg" target="_blank" style="color:#0000FF">Watch our Videos</a>'
                margmT += '</div><div class="row d-flex">'
                margmT += '<a class="cbot-btn" href="https://margcompusoft.com/marg-price-list.html" target="_blank" style="color:#0000FF">Pricing</a>'
                margmT += '<a class="cbot-btn" href="https://www.facebook.com/groups/margcompusoft" target="_blank" style="color:#0000FF">Join our community</a>'
                margmT += '</div>'
                let msgT = { name: "MargBot", message: margmT };
                this.messages.push(msgT);
                textField.value = ''
              }

            }

            //let msgT = r.tag;
            //if(msgT == "greeting") {  //| msgT == "myself") {
              //let margmT = '<div class="row d-flex" style="color:#000000">'
              //margmT += '<a> Select the topic or write your question below.</a>'
              //margmT += '</div><div class="row d-flex">'
              //margmT += '<a class="cbot-btn" href="https://www.margcompusoft.com/landingPages/billing_software.html?utm_source=Direct&utm_medium=homepage&utm_campaign=Free_Demo" target="_blank" style="color:#0000FF">Book Demo</a>'
              //margmT += '<a class="cbot-btn" href="https://www.youtube.com/watch?v=VvXe7S7Z5sg" target="_blank" style="color:#0000FF">Watch our Videos</a>'
              //margmT += '</div><div class="row d-flex">'
              //margmT += '<a class="cbot-btn" href="https://margcompusoft.com/marg-price-list.html" target="_blank" style="color:#0000FF">Pricing</a>'
              //margmT += '<a class="cbot-btn" href="https://www.facebook.com/groups/margcompusoft" target="_blank" style="color:#0000FF">Join our community</a>'
              //margmT += '</div>'
              //let msgT = { name: "MargBot", message: margmT };
              //this.messages.push(msgT);
              //emoji.jpg
            //}

            let msgU = r.urls;
            if(msgU) {
              let margm3 = '<div class="row d-flex">'
              margm3 += '<a>👇 For further details visit to : </a>'
              margm3 += '</div><div>'
              margm3 += '<a href="'+msgU+'" target="_blank">'+msgU.substring(0, 30)+' ...'+' </a>'
              margm3 += '</div>'
              let msg3 = { name: "MargBot", message: margm3 };
              this.messages.push(msg3);
            }

            //let msgI = r.image;
            //if(msgI) {
              //let margm4 = '<div class="row d-flex">'
              //margm4 += '<img src="static/images/'+msgI+'" />'
              //margm4 += '</div>'
              //let msg4 = { name: "MargBot", message: margm4 };
              //this.messages.push(msg4);
            //}
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    updateChatText(chatbox) {
      const dt = new Date();
      var hours = dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours();
      var am_pm = dt.getHours() >= 12 ? "PM" : "AM";
      var month = new Array();
      month[0] = "Jan.";
      month[1] = "Feb.";
      month[2] = "Mar.";
      month[3] = "Apr.";
      month[4] = "May";
      month[5] = "Jun.";
      month[6] = "Jul.";
      month[7] = "Aug.";
      month[8] = "Sep.";
      month[9] = "Oct.";
      month[10] = "Nov.";
      month[11] = "Dec.";

      //var dtd = (("0"+dt.getDate()).slice(-2)) +" "+ (month[dt.getMonth()]) +","+ (dt.getFullYear()) +", "+ (("0"+hours).slice(-2)) +":"+ (("0"+dt.getMinutes()).slice(-2))
      var dtd = (("0"+hours).slice(-2)) +":"+ (("0"+dt.getMinutes()).slice(-2))
      var html = '';
      this.messages.slice().reverse().forEach(function(item, index) {
        if (item.name === "MargBot") {
          //alert(item.message);
          html += '<div style="font-size:10px; color:#666666">' + dtd + ' '+ am_pm +'</div>'
          html += '<div class="messages__item messages__item--visitor">'+ item.message + '</div>'
        } else {
          html += '<div style="display: inline-block;font-size:10px;color:#666666;text-align: right; width: 100%">' + dtd + ' '+am_pm + '</div>'
          html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
        }
      });
      //alert(html);
      const chatmessage = chatbox.querySelector('.chatbox__messages');
      chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();

function myNewUser() {
  chatbox.newUser('Y');
}

function myExistUser() {
  chatbox.existUser('Y');
}
