// MarketingAjax.js
var MarketingAjax = (function () {

    function osvjeziPretrage(divNekretnine) {
        const nekretninaId = divNekretnine.dataset.nekretninaId;

        if (nekretninaId && !isNaN(nekretninaId)) {
            fetch(`/marketing/pretrage/${nekretninaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    const pretrageDiv = document.getElementById(`pretrage-${nekretninaId}`);
                    if (pretrageDiv) {
                        pretrageDiv.innerText = `Pretrage: ${data.pretrage}`;
                    }
                })
                .catch(error => {
                    console.error('Greška prilikom dohvaćanja broja pretraga:', error);
                });
        }
    }

    function sendFilteredNekretnine(filteredNekretnineIds) {
        fetch('/marketing/nekretnine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: filteredNekretnineIds }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error sending filtered nekretnine');
                }
                console.log('Filtered nekretnine sent successfully.');
            })
            .catch(error => {
                console.error('Error sending filtered nekretnine:', error);
            });
    }

    function sendClickedNekretnina(nekretninaId) {
        fetch(`/marketing/nekretnina/${nekretninaId}`, {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error sending clicked nekretnina');
                }
                console.log('Clicked nekretnina sent successfully.');
            })
            .catch(error => {
                console.error('Error sending clicked nekretnina:', error);
            });
    }

    // Public API
    return {
        sendFilteredNekretnine: sendFilteredNekretnine,
        sendClickedNekretnina: sendClickedNekretnina,
        osvjeziPretrage: osvjeziPretrage
    };
})();
