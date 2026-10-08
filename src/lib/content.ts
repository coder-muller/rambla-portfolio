export const navLinks = [
    { href: '#experiencias', label: 'Experiências' },
    { href: '#destinos', label: 'Destinos' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#processo', label: 'Como funciona' },
    { href: '#contato', label: 'Contato' },
] as const;

export const contact = {
    email: 'contato@ramblaviagens.com.br',
    phoneLabel: '+55 (53) 99953-2345',
    phoneHref: 'tel:+5553999532345',
    whatsapp:
        'https://wa.me/5553999532345?text=Ol%C3%A1%21%20Gostaria%20de%20um%20or%C3%A7amento%20para%20uma%20viagem%20dos%20sonhos.%20Pode%20me%20ajudar%3F',
    instagram: 'https://www.instagram.com/ramblaviagens',
} as const;

export const images = {
    hero: '1499856871958-5b9627545d1a',
    manifesto: '1515238152791-8216bfdf89a7',
    horizons: '1490237194689-1fc7b165bf2f',
} as const;

// Lugar da foto principal do Hero, usado no selo.
export const heroPlace = { city: 'Paris', country: 'França' } as const;

export const marqueeDestinations = [
    'Paris',
    'Santorini',
    'Kyoto',
    'Maldivas',
    'Machu Picchu',
    'Veneza',
    'Rio de Janeiro',
    'Marrakech',
    'Patagônia',
    'Toscana',
    'Lisboa',
    'Fernando de Noronha',
];

export type Destination = {
    name: string;
    region: string;
    description: string;
    image: string;
};

export const destinations: Destination[] = [
    {
        name: 'Paris',
        region: 'França',
        description: 'Arte, alta gastronomia e o charme atemporal das margens do Sena.',
        image: '1502602898657-3e91760cbb34',
    },
    {
        name: 'Santorini',
        region: 'Grécia',
        description: 'Casas caiadas, cúpulas azuis e o pôr do sol mais famoso do Egeu.',
        image: '1570077188670-e3a8d69ac5ff',
    },
    {
        name: 'Kyoto',
        region: 'Japão',
        description: 'Templos milenares, jardins zen e a delicadeza da tradição japonesa.',
        image: '1493976040374-85c8e12f0c0e',
    },
    {
        name: 'Maldivas',
        region: 'Oceano Índico',
        description: 'Bangalôs sobre a água e um mar em todos os tons de azul.',
        image: '1514282401047-d79a71a590e8',
    },
    {
        name: 'Machu Picchu',
        region: 'Peru',
        description: 'A cidadela inca suspensa entre as nuvens dos Andes.',
        image: '1526392060635-9d6019884377',
    },
    {
        name: 'Veneza',
        region: 'Itália',
        description: 'Canais, palácios e a poesia de se perder pelas vielas.',
        image: '1523906834658-6e24ef2386f9',
    },
    {
        name: 'Rio de Janeiro',
        region: 'Brasil',
        description: 'Montanha, mar e a energia única da Cidade Maravilhosa.',
        image: '1483729558449-99ef09a8c325',
    },
];

export type Service = {
    title: string;
    description: string;
    image: string;
};

export const services: Service[] = [
    {
        title: 'Voos & Conexões',
        description:
            'Emissão de passagens aéreas nacionais e internacionais. Buscamos ativamente as melhores rotas, conexões e upgrades, otimizando o seu tempo e conforto no ar.',
        image: '1436491865332-7a61a109cc05',
    },
    {
        title: 'Hospedagem & Curadoria',
        description:
            'Seleção criteriosa de hotéis, resorts e acomodações únicas. Escolhemos propriedades com alma, história e localização estratégica para o seu perfil.',
        image: '1566073771259-6a8506099945',
    },
    {
        title: 'Aluguel de Veículos',
        description:
            'Locação de veículos que trazem mais mobilidade à sua viagem, desde carros esportivos para rotas cênicas e transfers privativos até motorhomes equipados para experiências incríveis.',
        image: '1449965408869-eaa3f722e40d',
    },
    {
        title: 'Tickets & Atrações',
        description:
            'Acesso antecipado e sem filas aos principais pontos turísticos, shows, exposições e eventos esportivos concorridos ao redor do mundo.',
        image: '1501281668745-f7f57925c3b4',
    },
    {
        title: 'Viagens em Grupo',
        description:
            'Sincronia logística absoluta para famílias e grupos. Organizamos de forma centralizada as estadias, passeios e voos para uma experiência sem complicações.',
        image: '1529156069898-49953e39b3ac',
    },
    {
        title: 'Segurança & Suporte',
        description:
            'Tranquilidade do início ao fim com seguro viagem completo, conectividade global (chips e eSIMs) e um concierge sempre à disposição.',
        image: '1488646953014-85cb44e25828',
    },
];

export const processSteps = [
    {
        title: 'Conversa',
        description:
            'Tudo começa ouvindo você: seu estilo, seus desejos, o ritmo ideal e o que faz uma viagem ser inesquecível do seu jeito.',
    },
    {
        title: 'Curadoria',
        description:
            'Desenhamos um roteiro autoral, com hotéis, experiências e logística pensados nos mínimos detalhes para o seu perfil.',
    },
    {
        title: 'Reservas',
        description:
            'Cuidamos de passagens, hospedagens, seguros, veículos e ingressos. Toda a parte técnica e burocrática fica com a gente.',
    },
    {
        title: 'Embarque',
        description:
            'Durante toda a viagem você conta com nosso concierge por perto. Sua única obrigação é desfrutar cada momento.',
    },
];

export const pillars = [
    { title: 'Roteiros autorais', description: 'Nada de pacotes prontos: cada viagem nasce do zero, a partir de você.' },
    { title: 'Curadoria criteriosa', description: 'Hotéis com alma e experiências que valem a memória.' },
    { title: 'Do início ao fim', description: 'Da saída de casa até o retorno, cuidamos de cada etapa.' },
];
