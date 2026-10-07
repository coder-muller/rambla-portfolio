// Permite que um card de destino preencha o formulário de contato.
const DESTINATION_EVENT = 'rambla:destination';

export function requestDestination(destination: string) {
    window.dispatchEvent(new CustomEvent<string>(DESTINATION_EVENT, { detail: destination }));
}

export function onDestinationRequest(handler: (destination: string) => void) {
    const listener = (event: Event) => handler((event as CustomEvent<string>).detail);
    window.addEventListener(DESTINATION_EVENT, listener);
    return () => window.removeEventListener(DESTINATION_EVENT, listener);
}
