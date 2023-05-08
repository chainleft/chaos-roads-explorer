document.addEventListener("DOMContentLoaded", () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const nftContract = new ethers.Contract(contractAddress, contractABI, provider);

	const nftGallery = document.getElementById("nft-gallery");

	    document.addEventListener("walletConnected", (event) => {
	        const { account } = event.detail;
	        displayNFTs(account);
	    });

	    document.addEventListener("walletDisconnected", () => {
	        nftGallery.innerHTML = "";
	    });

	async function displayNFTs(account) {
	    nftGallery.innerHTML = "";
	    const balance = await nftContract.balanceOf(account);
	    for (let i = 0; i < balance; i++) {
	        const tokenId = await nftContract.tokenOfOwnerByIndex(account, i);
	        const tokenURI = await nftContract.tokenURI(tokenId);
	        const tokenData = JSON.parse(atob(tokenURI.slice(29)));
	        const imgSrc = tokenData.image;

	        const nftCard = document.createElement("div");
	        nftCard.classList.add("nft-card");
	        nftCard.innerHTML = `<img src="${imgSrc}" alt="NFT Image" />`;
	        nftGallery.appendChild(nftCard);

	        nftCard.addEventListener("click", () => {
	            loadAsset(tokenId);
	        });
	    }
	}

	async function loadAsset(tokenId) {
	    const tokenURI = await nftContract.tokenURI(tokenId);
	    const tokenData = JSON.parse(atob(tokenURI.slice(29)));
	    const animationUrl = tokenData.animation_url;
	    const description = tokenData.description;
	    const name = tokenData.name;
	    const attributes = tokenData.attributes;
	    const entropyAttribute = attributes.find(attribute => attribute.trait_type === "Entropy");
	    const entropyValue = entropyAttribute ? entropyAttribute.value : "Not found";

	    window.location.href = `asset.html?tokenId=${tokenId}&animationUrl=${encodeURIComponent(animationUrl)}&name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}&entropy=${encodeURIComponent(entropyValue)}`;
	}
});
