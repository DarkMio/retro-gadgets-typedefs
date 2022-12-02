
/*
 * Globals
 */
type Desk = ModuleBrand & {
    /**
     * Return true if the lamp is on
     */
    GetLampState(this: void): boolean;
    SetLampState(this: void, state: boolean): void;
}


/*
 * Desk declaration
 */
declare const desk: Desk

/**
 * Runtime functions
 */
declare let update: () => void;

/*
 * Undocumented
 */
type MultitoolConnector = ModuleBrand & {}

type Gadget = ModuleBrand & {
    MultitoolConnector: MultitoolConnector,
    PowerButton: PowerButton,
    // the following can be any number of components with their name and number attached
    [k: string]: any
}




