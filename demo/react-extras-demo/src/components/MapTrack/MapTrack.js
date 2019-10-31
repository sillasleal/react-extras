/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**/
import car from './images/car.png';
import house from './images/house.png';
//import point from './images/point.png';
import './MapTrack.css';


///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
///https://maps.openrouteservice.org
/**
 * Description of MapTrack
 *
 * @author Sillas S. Leal<sillas.santos.leal@accenture.com>
 */
export default class MapTrack extends Component {
    static propTypes = {
        /**
         * A chave de acesso à API do Google maps
         * @type String
         */
        googleMapsKey: PropTypes.string.isRequired,
        /*
         * Um id a ser atribuido ao mapa, o padrão é MapTracker
         * @type String
         */
        id: PropTypes.string,
        /*
         * Classes a serem adicionadas à div que comportará o mapa
         * @type String
         */
        className: PropTypes.string,
        /*
         * A largura padrão do mapa
         * @type String
         */
        width: PropTypes.string,
        /*
         * A altura padrão do mapa
         * @type String
         */
        height: PropTypes.string,
        /*
         * Um objeto contendo a localização central do mapa
         * @type object
         */
        center: PropTypes.object,
        /*
         * Caso seja informado, usa a posição fornecida pelo browser como center
         * @type Boolean
         */
        centerHere: PropTypes.bool,
        /*
         * A posição de destino
         * @type object
         */
        destiny: PropTypes.object,
        /*
         * O zoom do mapa
         * @type Number
         */
        zoom: PropTypes.number,
        /*
         * A cor da linha, caso não seja informada, a rota não será exibida
         * @type String
         */
        lineRoute: PropTypes.string,
        /*
         * A largura da linha da rota
         * @type String
         */
        lineRouteWeight: PropTypes.string,
        /*
         * A opacidade da linha da rota
         * @type String
         */
        lineRouteOpacity: PropTypes.string,
        /**
         * A distância em metros a ser usada para verificar se o carro chegou ao destino
         * @type Number
         */
        distanceToArrive: PropTypes.number,
        /**
         * Função a ser executada quando o carro chegar ao destino
         * @type Function
         */
        onArrive: PropTypes.func,
        /**
         * Método executado ao consultar as rotas
         * @type Function
         */
        onRequestRoutes: PropTypes.func,
        /**
         * Pop com informações sobre o carro
         * @type String
         */
        infoWindow: PropTypes.string,
        /**
         * Define se deve ou não exibir automaticamente o infoWindow do carro
         * @type Boolean
         */
        infoWindowAutoOpen: PropTypes.bool
    }

    static defaultProps = {
        id: "MapTrack",
        className: "MapTrack",
        width: "100vw",
        height: "100vh",
        centerHere: false,
        zoom: 8,
        distanceToArrive: 20,
        onArrive: () => ({ }),
        onRequestRoutes: () => ({ }),
    }

    constructor(props) {
        super(props);
        this.map = null;
        this.loop = null;
        this.carPositions = [];
        this.lastAdd = 0;
        this.carOnMap = null;
        this.destinyOnMap = null;
        this.routes = null;
        this.flightPath = null;
        this.overviewPath = [];
        this.arrive = false;
        /**/
    }

    componentDidMount() {
        if (!window.google) {
            //Google maps ainda não carregado.
            //É feito o carregamento dinâmico
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://maps.google.com/maps/api/js?key=${this.props.googleMapsKey}`;
            let firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(script, firstScript);
            script.addEventListener('load', () => {
                //Antes de inicializar é preciso esperar o js ser carregado
                this.getCenter();
            });
        } else {
            //O Google maps já foi carregado, inícia o mapa e o loop
            this.getCenter();
        }
    }

    componentWillUnmount() {
        //Para o loop ao desmontar o componente
        clearInterval(this.loop);
    }

    componentWillReceiveProps( { carPosition, destiny}) {
        if (JSON.stringify(this.props.destiny) !== JSON.stringify(destiny)) {
            //Alterando o destino
            console.log(destiny);
//            this.pushCarPosition(carPosition);
        }
        if (carPosition && JSON.stringify(this.props.carPosition) !== JSON.stringify(carPosition)) {
            //Movimentando o carro
            this.pushCarPosition(carPosition);
    }
    }

    /**
     * Método que inicializa o loop do mapa
     */
    loopStart() {
        const toCenterMax = 100;
        let toCenter = 0, speeds = null, incLat = 0, incLng = 0, push = true;
        this.loop = setInterval(() => {
            if (this.overviewPath && this.overviewPath.length > 1) {
                if (push) {
                    push = false;
                    incLat = this.overviewPath[0].lat > this.overviewPath[1].lat ? 1 :
                            this.overviewPath[0].lat < this.overviewPath[1].lat ? -1 :
                            0
                    incLng = this.overviewPath[0].lng > this.overviewPath[1].lng ? 1 :
                            this.overviewPath[0].lng < this.overviewPath[1].lng ? -1 :
                            0
                    speeds = this.getSpeed(this.overviewPath[0]);
                }
                if (this.overviewPath[0] && this.overviewPath[1]) {
                    let inc = 0;
                    if (incLat < 0) {
                        if (this.overviewPath[0].lat < this.overviewPath[1].lat) {
                            this.overviewPath[0].lat += speeds.lat;
                        } else {
                            inc++;
                        }
                    } else if (incLat > 0) {
                        if (this.overviewPath[0].lat > this.overviewPath[1].lat) {
                            this.overviewPath[0].lat -= speeds.lat;
                        } else {
                            inc++;
                        }
                    } else {
                        inc++;
                    }
                    if (incLng < 0) {
                        if (this.overviewPath[0].lng < this.overviewPath[1].lng) {
                            this.overviewPath[0].lng += speeds.lng;
                        } else {
                            inc++;
                        }
                    } else if (incLng > 0) {
                        if (this.overviewPath[0].lng > this.overviewPath[1].lng) {
                            this.overviewPath[0].lng -= speeds.lng;
                        } else {
                            inc++;
                        }
                    } else {
                        inc++;
                    }
                    let latLngOrig = new window.google.maps.LatLng(this.overviewPath[0]);
                    let latLngDest = new window.google.maps.LatLng(this.overviewPath[1]);
                    let rotate = window.google.maps.geometry.spherical.computeHeading(latLngOrig, latLngDest);
                    this.drawCar(this.overviewPath[0], rotate);
                    this.testArrive(this.overviewPath[0]);
                    if (!toCenter--) {
                        //Centralizando o mapa
                        toCenter = toCenterMax;
                        this.autoZoom(this.overviewPath[0]);
                    }
                    if (inc === 2) {
                        this.overviewPath.shift();
                        push = true;
                    }
                } else {
                    clearInterval(this.loop);
                }
            }
        }, 1);
    }

    /**
     * Método que verifica se o carro chegou ao destino
     * @param {object} carPosition A posição atual do carro
     * @returns {Number} Retorna a distância entre o carro e o destino
     */
    testArrive(carPosition) {
        const { distanceToArrive, onArrive } = this.props;
        const ori = new window.google.maps.LatLng(carPosition);
        const dst = new window.google.maps.LatLng(this.props.destiny);
        const dist = window.google.maps.geometry.spherical.computeDistanceBetween(ori, dst);
        if (dist <= distanceToArrive && !this.arrive) {
            this.arrive = true;
            onArrive();
        }
        /**/
        return dist;
    }

    /**
     * Método que retorna a taxa de incremento do carro no mapa
     * @param {object} position A posição usada como base na busca
     */
    getSpeed(position) {
        const speedDefault = 0.000001;
        const steps = this.routes[0].legs[0].steps;
        let step, brk, lat = speedDefault, lng = speedDefault;
        for (var index in steps) {
            step = steps[index];
            for (var item in step.lat_lngs) {
                if (position.lat === step.lat_lngs[item].lat() &&
                        position.lng === step.lat_lngs[item].lng()) {
                    brk = true;
                }
            }
            if (brk) {
                break;
            }
        }
        /**/
        if (brk) {
            lat = Math.abs(((step.end_point.lat() - step.start_point.lat()) / step.duration.value) / 100);
            lng = Math.abs(((step.end_point.lng() - step.start_point.lng()) / step.duration.value) / 100);
        }
        /**/
        return {
            lat,
            lng
        };
    }

    /**
     * Método que desenha o carro na posição informada
     * @param {object} position A posição do carro no mapa
     * @param {Number} rotation O grau de rotação do carro no mapa
     */
    drawCar(position, rotation) {
        if (this.map) {
            const mapId = "car_layer_in_move";
            if (this.carOnMap) {
                if (document.querySelectorAll(`#${mapId} img`)[1] && rotation) {
                    document.querySelectorAll(`#${mapId} img`)[1].style.transform = `rotate(${rotation - 90}deg)`;
                }
                const newLatLng = new window.google.maps.LatLng(position.lat, position.lng);
                this.carOnMap.setPosition(newLatLng);
            } else {
                const icon = {
                    rotation,
                    url: car,
                    size: new window.google.maps.Size(32, 32),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(16, 16)
                };
                this.carOnMap = new window.google.maps.Marker({
                    position,
                    icon,
                    map: this.map,
                    zIndex: 999
                });
                const overlay = new window.google.maps.OverlayView()
                overlay.draw = function () {
                    this.getPanes().markerLayer.id = mapId
                };
                overlay.setMap(this.map);
                if (this.props.infoWindow) {
                    const infoWindow = new window.google.maps.InfoWindow({
                        content: this.props.infoWindow
                    });
                    this.carOnMap.addListener('click', () => {
                        infoWindow.open(this.map, this.carOnMap)
                    });
                    if (this.props.infoWindowAutoOpen) {
                        setTimeout(() => infoWindow.open(this.map, this.carOnMap), 100);
                    }
                }
            }
            this.drawLines();
        }
    }

    /**
     * Método que desenha as linhas de navegação
     */
    drawLines() {
        const { lineRoute: strokeColor, lineRouteOpacity: strokeOpacity, lineRouteWeight: strokeWeight } = this.props;
        if (typeof strokeColor === 'string' && strokeColor.length) {
            if (this.flightPath) {
                this.flightPath.setMap(null);
            }
            this.flightPath = new window.google.maps.Polyline({
                strokeColor,
                path: this.overviewPath,
                geodesic: true,
                strokeOpacity,
                strokeWeight
            });
            this.flightPath.setMap(this.map);
        }
    }

    /**
     * Método que desenha o ponto de destino
     */
    drawDestiny() {
        if (this.map) {
//            const marker = new window.google.maps.Marker({
            const icon = {
                url: house,
                size: new window.google.maps.Size(32, 32),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(0, 0)
            };
            this.destinyOnMap = new window.google.maps.Marker({
                icon,
                position: this.props.destiny,
                map: this.map,
                title: this.props.destinyTitle
            });
        }
    }

    /**
     * Método que adiciona a fila de posições a ultima posição do carro
     * @param {object} carPosition A posição a ser adicionada a fila
     */
    pushCarPosition(carPosition) {
        if (carPosition) {
            console.info('Push car position');
//            const now = Date.now();
////            const lastAdd = now - this.lastAdd;
//            this.lastAdd = now;
//            this.carPositions.push({
//                time: now,
//                ...carPosition
//            });
            /**/
            this.calcRoute(carPosition);
        }
    }

    /**
     * Método que calcula a rota
     * @param {object} origin O ponto de origem a ser usado como base para a consulta da rota
     */
    calcRoute(origin) {
        const { onRequestRoutes } = this.props;
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route({
            origin,
            destination: this.props.destiny,
            travelMode: 'DRIVING'
        }, (response, status) => {
            onRequestRoutes(response, status);
            if (status === 'OK') {
                this.routes = response.routes;
                this.overviewPath = [];
                for (var item in response.routes[0].overview_path) {
                    this.overviewPath.push({
                        lat: response.routes[0].overview_path[item].lat(),
                        lng: response.routes[0].overview_path[item].lng()
                    });
                }
                console.log(this.overviewPath);
//            } else if (status === 'ZERO_RESULTS') {
//                if (this.map) {
//                    this.map.setCenter(this.destination);
//                }
            }
        });
    }

    /**
     * Método que define o zoom de acordo com a origem
     * @param {object} origin O ponto de origem
     */
    autoZoom(origin) {
        const bounds = new window.google.maps.LatLngBounds();
        const loc = new window.google.maps.LatLng(this.props.destiny.lat, this.props.destiny.lng);
        const locOrigin = new window.google.maps.LatLng(origin.lat, origin.lng);
        bounds.extend(loc);
        bounds.extend(locOrigin);
        this.map.fitBounds(bounds);
        this.map.panToBounds(bounds);
    }

    /**
     * Método que inicializa o mapa de acordo com as configurações de posição inicial
     */
    async getCenter() {
        if (this.props.centerHere && typeof navigator.geolocation === 'object' && typeof navigator.geolocation.getCurrentPosition === 'function') {
            try {
                const { state } = await navigator.permissions.query({ name: 'geolocation' });
                if (state !== 'granted') {
                    throw new Error("You need to request permission to access geolocation in your application");
                }
                const { coords } = await new Promise((rs, re) => navigator.geolocation.getCurrentPosition((s, e) => e ? re(e) : rs(s)));
                this.loadMap({
                    lat: coords.latitude,
                    lng: coords.longitude
                });
            } catch (e) {
                console.error(e, e.message);
                this.loadMap(this.props.center);
            }
        } else if (typeof this.props.center === 'object' && this.props.center && !Array.isArray(this.props.center)) {
            this.loadMap(this.props.center);
        } else {
            throw new Error("Prop center or centerHere was not defined!");
        }
    }

    /**
     * Método que carrega o mapa na tela
     * @param {object} center A posição central do mapa
     */
    loadMap(center) {
        this.map = new window.google.maps.Map(document.getElementById(this.props.id), {
            center,
            zoom: this.props.zoom,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });
        this.loopStart();
        this.drawDestiny();
    }

    render() {
        const { id, className } = this.props;
        const style = {
            width: this.props.width,
            height: this.props.height
        };
        /**/
        return <div id={id} className={className} style={style}></div>;
    }
}