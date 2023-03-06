import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './images/newbeem.png'
//import ipfsAPI from 'ipfs-api';
import line from './images/line.png'
import {
    Form,
    FormText,
    FormGroup,
    Label,
    Input,
 } from 'reactstrap';



class Operation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          file: '',
          imagePreviewUrl: '',
          fileHash: '',
          added_file_hash: '',
          imageContents: ''
        };
        this.setContent = this.setContent.bind(this);
        this.getFileContent = this.getFileContent.bind(this);
        this.hexToBase64 = this.hexToBase64.bind(this);
        //this.ipfsApi = ipfsAPI('localhost', '5001')
      }

  UpdateInputHashValue = (e) => {
    e.preventDefault();
    console.log("input field updated with "+e.target.value);
    const text = e.target.value;
    this.setState({ fileHash: text })
  }

  getFileContent(callback) {
   /*
    this.ipfsApi.get("/ipfs/" + this.state.fileHash, function (error, files) {
        if (!error) {
            //console.debug(files[0].content);
            var url = files[0].content.toString()
            //console.debug(url);
            callback(url);
        }
    })
    */
  }



  setContent(content) {
    this.state.imageContents = content;
    //console.debug(this.state.imageContents);
  }

  DownLoadIPFSFile = (e) => {
    e.preventDefault();
    console.debug(this.state.fileHash)
    
    this.getFileContent(this.setContent);
    
  }

  hexToBase64(str) {
    //return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    //console.debug(str);
    //var url = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMVFBUWFRYZGBYXFxgXGhUaFxYXFxgYGBcYHSogGxomHxgXIjEhJikrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGi0lHyUvLS8tLS81LS0tLy0tLS0tLS8tLy0tKy0wLS8uLS0tLS0tLS0tLS8tLy0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUCAQj/xABCEAACAQIDBQUFBQUHBAMAAAABAgADEQQSIQUGMUFRBxMiYXEyUoGRoRQjQmKxcoLB0fBDU6KywuHxFRYzkhclY//EABsBAQACAwEBAAAAAAAAAAAAAAACAwEEBQYH/8QANREAAgECAwUGBQMEAwAAAAAAAAECAxEEITEFEkFRYRMicZGh0TKBscHwFOHxBhUjQlJigv/aAAwDAQACEQMRAD8AvGAIAgCARXC760lxLYLGWw1cEBCx+6rhvYanUPAt7ja3uAWsTBmztclUGBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQCH9pW6Yx2HJRQa9MEpf+0Xi1JvI206MBqNZhq5ZSqunK68no+jIV2abxV8GrjHVmp4JaRakMQlTvQysFKUmIu6gHhqeFgLNIqWdmbdbCqVPt6GceK4xfXpyfmW9gsWlWmtWmwdHAKspuCDJmgZ4AgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAQ/tE3OOORXpPkr0g2QNc03DWzI69DYeIaiwkZRUlZmxhsTUw89+m/Z9GRDcPa42W74PEAjNUBe1TOmGJQXAFtdTqQf0MqVTddmdaeyniKX6igrXV93rxs/oW8rAgEG4PAjnLzg6H2AIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgEa3q3No4wh7mlVGneKAcw6OPxD4g+crnTUjpYHadXCpxWcXwf25Eb2XiK+xGFLGOa+BqNZMUAw+yuxsKdRCSEpHSzDQHjx0lGNjUxFbtZb3q9X46Fj03DAMCCCAQQbgg8CD0kig9QBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAxYrDpURqdRVdHBVlYAhgRYgg8RAIAwrbDNxnr7KJ1Gr1cBc8RzqUPLiP8wE+weKSqi1Kbq6OAVZSCGB4EEQDNAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQD46ggggEEWIOoIPIwCucds3EbGqNicEjV9nsS1fBjVsOTq1XDX/DzKfw1QCc7G2vRxVJa9CoKlNgCCOVwDZhxVtRodYBvQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAq3fztFr4TENSRVCpbUgMT8z/KVPfbyaRu0ZYSMV2kZSfRpWIFsvbOJw2JOPwCErVP3+Fuzh+d1XUga6alkPMqbTCqNPdlkzNehTsqlFtxfPVdOviWTj+0vu8oNMI2Vc6MCe7JUMbuhNzc2yBSdCb8AZxldGpKFmY8B2p03YKMr8zdTSsB7RGYk2AubkWPUSVyBM9g7y4bF5hQqBylswsdAb2IPAjQ6gmZB14AgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAUF2vYYDHuTwshHqyi5mAWZuLu3RpbPpB0W7A1GbgfHqPENdFyj4SLgpak41JR0ZTe3sRRLMaXsM1Qrm1NmYtduHUaafCNCx3k7nA2Vh3fECogP6C1tLkedjbymHKxnsyyexCmaVdqZ4lHB8shtb0NlMkncrlHdLrkisQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAKL7d8JUXEd6AAhpAhiw1KXuAvG/DjbjpflgFjY7YuJr7LoYanWWnUNCitRrkBh3YDj2S1j+6evMQ1kWQlFSu0U/sfdZq2JrYWq5Q0mqhipsTkcIthf2SLnpqOsrbszYsnC+hNNt7Ep5RRVmpXUEvTsrEjS91troL9ZVezuZ+JWI/sDbVHZ2P8AvFeoBdWYMb0iSfEf7w5WFwed+YEkqijmzejs+deF4cuPGxemExSVUWpTYOjAFWBuCD0l6d80cacJQk4yVmjNMkRAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAIn2kbqjH4UqoXvaZLJcDxaG9O54Bv1CwCmdgb843ZgqUizVKTAhVq5mNF+F1vrYc04emt4yvbIuodn2ke0+G+duRpHblanW+0JVPf1lOZrBs6sR7wI1yr/wCotNaO81Y9Hi6OHjUTSW7a9lkn4HV2xvLiKxAo0xcABqmoHXTlfn1iUEleTNHDRVWpahBtf9mkl5Gpsqg6ktmu972NSmtzxN1aorMf6tKtWelnanHdtl0T9mTnC75VcC9Bqyk0KgZHsCQGFspUgaPYm4OhA5cZdSk07cDz2PoU5q8LuV168+nUtPZ+0KVdFqUnV0YAgqb6Hr04HQ9DNlNPNHDqU505bs1ZmzMkBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAKi7Y9zVIOLp2GdgtReQY8KgsOPUc+Prgzcq1cJb7unmYAat/ty5zBneb1NfHbcq0UFOm9he9rKRc8TqJGVNSeZt0MdVox3YNeSPa45qi94hDkWzB1H+m2ki6MTajtnEL4rNfnKxI8LXavh2w9Wn3bsA1EjNl7xQcgN+uq8ODnhxlTW7KzOlCpLEUXWpZSjqtfxHM3N3rqYaqK1E2YaPTPsuvQjmOh4gw1KnK6LqdShtGjuTykvNdV0/GfondfejD46mGpOA9rvSJGdOF7r01Hi4G82YyUldHmMThp4eo4S/k7cka4gCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIBGu0HCtWwNZabKHUK/iIA0N7E8ri8w3kSjFyaS4n5/2zUfD6JUUki5GQra/D8R4jXhzEjF3VyyrTUJbqdyH16+Ym+hP9aSRBHV2HTIYZCNQQQeB8jK5VLHTw2zXWjrm9P38SabjbWFLFUUxCZkatYIRcUrXs5YG+bmNCCCRzuJWjKzNLerYeUoXcXo0SvtY7NxWB2hgEvVPjq0qf9sCLmrTA/tOZA9q5Pte1lq5ClVcHdP5lW7t1qmCxdDFOatPLUFyNCwDDvKTX43FwR58pVv2XdOksFvSTrStdZPXN6bz4X5n6sweLSqi1KbB1YAhgbggy5NNXRyp05U5OMlZozzJAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQCOb+7UGHwjuXVOVyL5hY3UD3jwHEcyCARMMIpTBb2o1FqHjp0nfO6Zrs7aHOzcW4Dy8I00Ei1dWLYVHCW8jh1sEuJxOUVCVfvDfQEEIzKBoRa4Atbh04zJG98zj4nZxpC4JKuEIJA4EFgDbg2lyOVpCRu4VwzT1NzYyaZh7Sm48xzEoqM7+AilI6+OIKiqvEWDfwPwP6xQlZ7rIbewd4KvHhk/B6eT+pcXZntdzS7upcrnIRjyJ5X6E3t56c9Ns8met+t0FqLUq06XerU1xGGWwNUgWFegeC4pR8HHhblElctpVXTldfPk1yZVPZ3vb/02v4wXw9Wys34ksTb4gk8fMaTWi7O6WfFfdHfxdDtKUYOV4/6S5X/ANZdOT4aPp+hMDtehWIFKqjkoKgAIJyE2DW42uLeRmwpJ6M4FShVp5zi1nb5m7JFQgHx2AFyQAOZ0gGKlikbRXVvRgf0gGaAIAgCAIAgCAIAgCAIAgCAYMXjKdJS1R1QDW5MAr/bvacuY0sEnev/AHjewvn5zAIrjneqrV8ZVaoALm+i/sovAD6zBkr6rhO/r50UIrE2UcgJkDa2zTSOZCyt1BIPzEBHN2RtUllp1hmp+FdLAqFDWVeA1LC99bAC8iy6km5JI3gpoVWW4IvoRqCOKkeRFjKJK+R6XDTslNHQw9QEEfhYEfOU6SO64qvQlHmmiX7FwFepTYUaoY0zlYMzWJtwReCDUjNa553tpl1JzzWR5rscNgnGNWG82rt+xcGwMc5ooMQVFXgdRr0N+F+s2qcnu97U4mKjS7V9jfdODvN2b4TEpWNNBSrVXaoal2IZ2AzBgT7JtfTgdRzvmdNSzWpbg8dKh3ZLeg9Y+3UpSnUxWycWA16b028JOosfwt71Nhz/AKGvZ3uspI7satN0uyqPeoy+GXGL5Pw4P7H6I3W3gpY2gtanoeDpe5ptbVT/AAPMWm1CakrnncVhp4eo4S+T5o7EkaxgxmESqjU6i5kYWI1Fx8IBV29PYnQq3fB1noPypuWqUyfIk5l+Z9Jixm5Wu0W23sh7NWxFJeCsHNWi3oGuvwIEAle7HbrVUhMdRFRf72j4WHm1MnK3wK+kyYLa2Lvfg8Vk7isG7xSVurqDbit2AGfQ+HjoTawkd5XsW9jN0+0Sy/OGvzO7JFQgCAIAgCAIAgCADAKC3zPf12qOXCswNswsOVsvK9up9eU0liHfM9N/Y4zpdx970f5+Ix4fFLQK2w2enlzElgnxAsS3Dja0tdeJz6exsRJ2dl9PT6GDbu0Tjqi01K0KIGY5mA9Sep6CThUi9DWxOz8Rh3345c1mhsyqiHNTw9aqtrIVWwygcr8b6m4uJh1oxJ0tmV6ivkvF2NbbCvVJHcPTJGmbLrckaa+RmO3gT/tOI4Wfgyu6lIqSpFiCR8jaWXNdR1TOrg3z0x7y3B6nmCfmR8JVLJnc2e3UotPVG9s5vw/KVVFxO3gZ7vdZMd09q91WDHn4XPMqba+ZGhla7ruS2lgY16LUddV4/uSD/uSrTrOA4rUw/Cw9n8rDmOpuNI32mc2Ox6NWhG8XCdvXqv4LN3frU6lIVKTlkbgDa6nmCORm7TaaujymJozo1HTmrNHO363QpbQoNTNkqhT3dW3skjg3VCeI+I1kpRTzFLETpxlFaNZrh4+JS+w8Rith4ukMX3qIWu1NPFTqJ4kz3BAcqGJAvceHThIJNSyRtSnCeH/yScmvhSWS8W8/kj9C4DG061NKtJ1qU3AZWU3DAy05xsQBAMGNwdOshp1UV0YWKsLgiAUD2j7iYbAV1ei65at/uGN2TUeJOqg8RyFyNBYV1E7ZHQ2bOnGut+KaeWfDqRuhWZGSorEMhBVgdVKm4t6GabbTPaRhSqwaVmtGfozc3eFcbhkrCwceGovuuBr8DxHkRN2nPeVzw2NwssNWdN6cPA7smaggCAIAgCAIAgCARDfHYGF7p6x+6c3syi+diNFKHQgnWwtzN+c1q1OFt7Q7WzMdie0jSj3lyfBc78PXkVnWo25C1lAtoxsLNpe1rDpzM0z1m80suvgc4UaTMxUrdVzHQrYC/isdLAW4fS8yk+AnXjTXfdvH3MGNxikMzWKgMOLMALZgXN7E9Av1mVBspli6UFe666GlSqjTu1Baqlxc5SA3hVgOgK6a8xflJypOPxGvhtoQxSluZPry5+By627x1Odr6G5swJP5iRzlirnNeyW22pZ+dzl1cNUoNcjmQeYNuP8AwZapRmjTca+Dqb9vZ/nmdHCOGGZZXJWyZ38JVjViqkDso5GVx8fX/f8AnKOh2oSurHbw7g2Yc5FlciZ9n21DSxHck+Crw8nAup+Oo+Utw892VuZwduYVVaHarWP0/My0Jvnjjkbz7u0MdQNCutxxVh7VNhwZTyP0IuDcGYaMxdncpvZG1MXu7izhsSDVwdRiwy3IIuB3tK/BhcZk/wBiSJSS1X8F54DG061NK1Jw9N1DKym4IMyQNiAau1MelCk9aoQqIpYk+UA/Me3dvVcdjKmIbQEGw5Il/Ao8yQNPXpK5ysjobOozq1bR5GqlXTLpe+n7IFuHqfrNeauj1OFfZzcZNXfBclxJX2ebzfYcUCx+5q2Wr5C/hf8AdJPwLSNOe5LoR2rgv1NG8fiWa+6P0IrAi41Bm8eIPsAQBAEAQBAEAxYvErTRqjkKqi5J5TDaSuydOnKpJQgrtlU7e242Kq5joi3CL0HU/mPOc6rUc3c9rgsDHC07f7PV/nAiG26uaqq+6Pqf6EQWVzsYeNotmxSUHOLDM9KopPM/dta5+Ak6OU0crbFHewkmuFn6ld7VwYzXAm7c8RYkO0MLajhaq6EYWlr6hgf1MjLPIuoTlTkpRdmjQpbUFQhHWzltCOBvoADxGpPG/rNZ0nHNHosNtRVWoTVm+WnujoV8J3im4N9PUgHn+fgeOoB6GVKW6zpTpwqx3ZI1aNHLYa/H+Um5XZdCioU7I6mETMCnXh68pXIspVDLsyva6Hl/REy8zaavmd7AV8rI44oyn5EGQ0dzVr096Eo80y9KL5lDdQDOondHziSs2j3MmDgb8YDCVsI6YwhadtH/ABI1jY09Dd/KxvwsRIyaSuy/D06tSe5SV2/p16eOmpQWxdrYnCLVo0MTUFFqmZQvg1B9vTVSRa6g24XvKJ1G1ZHpcDsiNOo5VbNcFr+eRcvZbvHXxdGqK5DNSZQHsAWDA6EAWuLcfOWUpNp3OZtrB0sNUj2WSa0IR2570MaowCBgqZWfQ/eMwuqjqACOHM+UsZyErleqgpJluOrkc26eYXgPiec1ZNykeywVCOCwznU11fsbu4W7lTaONFMEpTUZ6rgewnAKOWZibD948psKGVjzE8bN4jt1rfTpyJBsncLEVMc+DcFFpG9SrbTuyfCy34lraD190zWVJuVj0tba1OGHVSObei69fDiX5gcItKmlJLhKaqqgkkgKABqdToJtpWVjx85ucnJ6vMzzJEQBAEAQBAPhMAqPfPe77TUNKk33KHiP7Rh+L9np8+ltGtU3nZaHtdlbM/TQ7Sou+/RcvHn5HHw7aShnSZH6z3rMfzH6aS1fCbsMqZvU6tmB6ETCdncoq01VpypvimvMi22sPYnyJE3Uz51KLi7PVHUqvmwVA9KRX/0q1F/QCGIka2amaun7X6a/wkJ/CzobOjvYiC6kqKXNpq8D3kbJXFbBATFzXqTuj7g0s0w2a0cmNopkqhxwbX48/wCfxiJuUpXR1MMdbdRMMVC8thVc1JfID5EA/wA50YPunzjFRtUZ0JM1ys+17aNOrg6BpVEqI9ZrMjBlJQMrWI00NwfjKa2iO9sBf5pPp9ypwJrnqpNHc3P3xrbPqMQgeg4OdWuoLLaxVwDZhmFxY6MNOEupuyPObVpqtVim7KKbb1yvyRudom3cLjqlGtSpMtVEszlvXwFRpcEkhr8vS2J1b5Is2fsl0p9pUd7ae/59iA4+rnYU0GY3AsupZjoqgczcjTqRJUo8TU2zjd+XYx0Wvj+318D9I9nO6a7Owi0yAaz2esw1u5Hsg+6o8I+J5mXnBJRaAfYAgCAIAgCAIBGO0nHtR2fWZDZmypfoHYBv8N/nKq7tBnU2NRjVxkFLRZ+WnqUVgXmkz3dSRIcI2kgasmcHEaVW/aMtWhvU3eBt3uLyJBZM0dtYe6huv6ibNKV1Y8ftrD9nX31pLP58ff5mNR/9eD7j1V/yP/rMtOMjj7r082Iv7qsfpl/1SutlE62xo3xKfJN/b7kopr45q3yPZuXdNuslxMGs2atFdYZWhtoeBT0P8P8AaYibFF6nvZdW4X5TMi6roWnsLeIJhKlRENRqFAk0gbM3drfQ2PEA8j8ZuUZpo8LtTCypTu9G7p+JUm8vaHjcWr03rZKdQ/8AipqFGUXGTP7bKedzqRyF1lt7nKtY4Wy675DTzHuw2cJyDMMpYDkSFUfASmqd3Yfxz+X3O5s/7OEepX7xyCop0aZCmqSGJzuQciCwuQL+LlK4pcTrYqrVUlCnx1b4fnU5uLxZbwlfCGJFOmzKlMkAG1ySzEAXJOth0EkotmlOvCDs83z/AD+DDUqhUzAFgTbXkejf1r87Ny7syU9pdlR3kr8F+5YHZnt7C4jFUhjqVM4xNMPiiMpqaWFOpbQ1ANEZgb8NG9rZR5Z5u5dsyYEAQBAEAQBAEAQDj72bCGNwzUC+S5UhrZrFTfUXFxIThvKxuYHFvC1lVSv08SAf/ElRdVxSE9DTK/UMf0lDw75ncf8AUMJa02vn+yMNXcjGUfwLUHWm1/obH5CVSoTRfT2thqnG3j+Mie3tmsjZ8pBHtAixHqDqJGOWR28JXjLJPwPmCsy3mGW1cmZcTRBpsD5W9b6SVOW7I5e0qHb4dris18v2OJhq6ihWoniHzgdQyZG+Vl+c3TxJp7oKi1HDEioVsByK3ufjoJRXvZHc2JKCqSu+9bJfU776NNY9Q5ZG6guJgqbMIp6zJVvZmHa9BmQZRcC5PlYf8wjYoTim0zzu5QZzZVLHkFBJPoBrDzyRdXqRhC8nbxJbsvDVlZ1pkoxUoxH4VPtajgdLaa8eB1F9GEou7PJ7Wx1KtFU6bvnqZMZufhnREKGycCvhPC1tOC8NB0EvOEQvbGwvslVhYmm9jTPEnjdet1uNehBvxldTOx2dkS3XO3T7mh3FjnNhp10Ave5Py+Ur6I7Lko3nNmqjFSSELK17HKxuCbjgL/PQiW2TVrnJU5Rm5qN076oyvsmu1EVBScq9ZUFlv48tlXT8Rvw9OeknHN3NLF3hTUHq3e3Qtbs07NWwtQYrF5Gq5fu6Q8XcsT7Ra+UvbTQG1zY8zZY5tyz5kwIAgCAIAgCAIAgCAIAgGrj9m0qwtVpq48xqPQjUfCRlFS1LaVepRd6cmiJYzs3oEk0ajUr8iA6/DUH6ymWHT0Z2qX9QVkrVIqXo/uvQ5tXs4q8BVpMPzKw/nIPDvmbUf6gp8YNfNfsRHeXdNsN3iVRTbOtJ7rcjws6c1Fj4uXWXwTSszh4upRqVN6imk+D5+xCd28GzY5KaC7MzKBcC+YEAXOkjUi5RsizAVo0a8ZyeXHyJltLd/Fo3iw1a3UIzD5rcTV3JLVHqI42hPSa87fUyYTBVLao49VI/USDiyfaw4NeZ1Nm7uVq7Wpobc2a4VfU219BcycKcpaGlXxlKjnJ/JakxwW5uGoIXxLioANc3gpjyte56anXpNmNCK1zONiNr1Zv/ABrdXqa1baBqg0cHTFChwaoFCFh0UC1h9euXnPJZI505zm7zbb65mbDYVaa5VH8zMGCP7a3jVLpRtUfUFuKIfO3tHyHxI4SEppaHSwuzp1O9PJerIVtDFktmdmqVG5cSfIDgq/IcZVZyzZ1nKnQSpwWfJa+L92agwZY5qnqEHsj194+szvWyRmNCU5KVZ35Lgvd9We3e2n9fOSjTvqa+K2nGn3aWb58F7/QnvZ1vNjWdMKtJK1JbXawpmkt+JZBlNuQK3J585sLkednJyblJ5stWSICAIAgCAIAgCAIAgCAIAgCAIAgEL7UMODhxU5jw/BmRv9P1mGThqVJulaljHxDDShaofRTmP0BkEy2SyP0ZUqqozMwA6k2HzlhrnLr7x4dSQWa45ZHv9RMbyM2Zo1952YWo0TfXxVLBfLRSb/MSO8Z3ThYynf77GVs+XULwRfIKOJ5aC553kW+ZZTpym92KuzTo720CcpSoijRTlBBHKwUkj4gSHaRN+Wy68bWSZxds7fqVrqt6dPoD4mH5iOX5R8SZVKo3odPC7OhS70836IjZrFvDStbm/Ifs9T9Isl8Ra60qz3aOnGXtzfXTxPdKgtME8SeLHUn1P8Iu5OxNRpYaDlJ+Ler9zVr1bm/KXQppHCxe0J1rxjlH1fj7El3Z3FxGKIdwaNHjmYeJh+ReJ9Tp6y2xzrlv7F2PRwtIUqK5VHE82PvMeZkiJvwBAEAQBAEAQBAEAQBANbaGIemmZKTVbcVUgNbqobQnyvAODh9/MGxKs7UmBsVqKVIPQiYuS3TsYbbWHqapWpn94fxi5izNtK6ngyn0IMyYPFfGU0tmdRc2FyLk9AOcArTeXeU4rvKai1ND4SbEOcrG9h4sulgeZOgAFzRO89HktTpUI/p7Oce9JLdvn87LPwIPsiqXrPmIyMpuFBs2YhCua1ufXl5yuMU/hyfiblerOCSrWcXyT+trXXLUnu6u0Xr0Ee7lhdcznNUNtLlhwuLGwsJcr8TlVNxybjodr7M4GYowHMkED5mCKzyRof8AWcPe32ilobH7xf5yO8uZsfpK/wDwl5Mge09q1K1S7aqC1rGyqBwsOZPWa7lc9LhsLGgkox11Zr4TKblSTdjxvx4EC/AaTDvxL6Sg05R4t8/DibJEwSayNLCAquS2oJAHM66S/ccnc4qxsMLTdPVptJdL5XJHsncbF4ghmXuU96pcH4J7Xzt6y+MEtDiV8TOtLem/28CwN3tx8LhrOV76qPxuOB/KnBfXU+clY17knmQIAgCAIAgCAIAgCAIAgCAIBxtv7sYbFj71PHbSovhcfvcx5G48osLldba7NcRSJagVrryGiVB8DofUH4SNiSZEcXTrUjlqCrTbo2ZT8jMErmDB4ju6yVTc5XVj1IBBOsGTtbEoEHEKSpDU0y2JGZUDLnH5Tn5eYNiCJCKsmjexM3VlGtdWyVr2asvRdTj7GSwrsdGSmzGwyg+3YleBGYaHjprwkaWf5+eRnHRcUr2v0y552zv0evNHRwe2KtGiiJXakpW5VXKak2voQeUjVcr2R0dk0sK6DlWUb3420suZoYrH97rUqtWt1Y1P5ylxk9TtQr4aC/xW/wDKv9EY87H2abfvWUfXX6RuriyMq9SXwQfi8vd+hno3HtWv5cPrMNcicN63e16En2Ludi69myd0nvVLrf0T2j8gPOWRoyZoYjamHo5X3nyXvoTbBdnuGXV2qVDzuwUfAKLj5y+NGKOFiNrV6qsu6umvn7WJDs/ZFCh/4qSJ5gDMfVuJ+Jl1jl3N6AIAgCAIAgCAIAgCAIAgCAIAgCAIAgGOvQVxldVdTxDAEH4GAR7Hbh7Pq6nDhT/+bNT/AMKkL9Jixm7OBtrdPDbPoVcQlasqhbFXcNT8RAvly3zdDeYaJxnZq5UWxtr02XEU7gM1KoUUaA2u7aH8VsxJ525SuNPddzaxGL7aNmrZ38+fXm1ryLC3S3OXHYZa4qinYlLGkH9m2t84PPhaJUt53ubeD2qsNTVPs79b2+zO9Q7MVHtYliPy0wv6sZH9OuZtS/qGT+GmvO/2R0sN2d4RfaNWp+04X/IAfrJKhE1Km3MTLSy8F73O3s/d3C0bGnQpqRwa2ZtPztduZ5yxQitEaFXGV6uU5trlw8tDqSRrCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCARPtNy/YWDAm7plA4lgcwsOfA/0JhmUruyKHwCgVlUhe7q1FViQDbxqSVI4MLSG+nobP6ecWt9c/RfXoW92O7xirQ+xsAGoCykH21vqT53PKTRrMsaZMCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgHzNAPJqCAeDXEAiu/W9jYOmnd5M7k6uCVAUa6BhrqOcAgX/e+JxfeCq1JadJM10W3jJsmjE3Ns/O3H0mCSy0Itu+A9Z8MKoXvabqrHhmscvDnrf4SO6loWyrzm1vv89ySdktAU8a51uqOp6LwHL0tKqdVylax1NobNpYaipxk23YuIY0TYOIZFxggGRcSIB6FcQD13wgDvhAHeiAfe8EA+5xAPt4B9gCAIAgCAIAgCAIAgCAfCIB5NOAY2oQDG2FgHO2psGnXAWouYA3Hytw4H4yEoKWpfRxE6N9zj0TOG+4VABsiMha12ARjpfgGUgceIF5DsVwbNlbRqXTlGLtpl7WNIdnKZ+8L1mPmKNj5Ed3a0wqCWabLKm1qk47koRt4P3JVT2c4AFrAf1yl5y27syDZrdRAPQ2Y3vCAfRs1vegHobOb3oB6Gzz70A9DAH3oB7GD84B7XDecAyClAPQSAfbQD7AEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQD//Z"
    return (str);
    //return url;
}


  render () {
    let $imagePreview = null;
    let imagePreviewContent = this.hexToBase64(this.state.imageContents);
    if (imagePreviewContent) {
        console.debug('imagePreviewContent=' + imagePreviewContent);
      $imagePreview = (<img src={imagePreviewContent} />);
    }
    return (
        <div className="container">
            <img src={logo} alt="newbeem" width="200" height="80"/>

            <Form onSubmit={this.DownLoadIPFSFile}>         
                <div className="row">
                    <div className="col-35">
                    <Label for="fileHash">File Hash:</Label>
                    </div>
                    <div className="col-65">
                    <Input type="text" name="file" id="fileHash" placeholder="File Hash" ref={node => {this.inputValue = node}} onChange={this.UpdateInputHashValue}/>
                    </div>
                </div>
                <div className="row">
                    <input type="submit" value="Get File"/>
                </div>
            </Form>
            <Form>
                {$imagePreview}
            </Form>

        </div>
        );
  }
}

export default Operation;