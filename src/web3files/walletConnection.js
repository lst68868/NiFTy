export const connectWallet = async () => {
    
    // Metamask injects ethereum to the window object
    if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          
          
  
          const obj = {
            status: "👆🏽 Write a message in the text-field above.",
            address: addressArray[0],
          };
          console.log("connectWallet");
          console.log(obj.address);
          
          return obj;
        } catch (err) {
          return {
            address: "",
            status: "😥 " + err.message,
          };
        }
    } else {
        return {
          address: "",
          status: (
            <span>
              <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download`}>
                  You must install Metamask, a virtual Ethereum wallet, in your
                  browser.
                </a>
              </p>
            </span>
          )
        };
    }
  };