import {
    Router,
    View,
    http
} from "jolt";

class Home extends View {

    load() {
        super.addStyle(`
            .center {
                margin: auto;
                width: 50%;
                padding: 10px;
            }
        `);
    }

    render() {
        return `
            <div class="center">
                <input id="weather" />
                <button id="redirect">Submit</button>
            </div>
        `;
    }

    didLoad() {
        if ("geolocation" in window.navigator) {
            let geo = window.navigator.geolocation;
            geo.getCurrentPosition((pos) => {
                router.navigate(`/location/${Math.floor(pos.coords.latitude)}${Math.floor(pos.coords.longitude)}`);
            }, (err) => {
                throw err;
            })
        } else { /* geolocation IS NOT available */ }
    }
};

class Location extends View {

    load() {}

    async render(params) {

        let pos = params.pos.split("-");
        let lat = pos[0];
        let lon = pos[1];

        let weather;

        await http.get(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`).then(data => {
            weather = data.data.weather[0];
        })

        return `
            <h1>In your location, here is the current weather:</h1>
            <h2>${weather.main} - ${weather.description}</h2>
        `;
    }
};

let router = new Router({
    "/": new Home(),
    "/location/:pos": new Location()
});

router.listen();

if ('serviceWorker' in window.navigator) {
    window.navigator.serviceWorker.register('service-worker.js').then(function() {}, function() {
        console.log('CLIENT: service worker registration failure.');
    });
} else {
    console.log('CLIENT: service worker is not supported.');
}