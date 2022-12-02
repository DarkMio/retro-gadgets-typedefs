/// Assets
/// https://docs.retrogadgets.game/api/assets.html
/// they're essentially entirely virtual and are cannot be instantiated
/// the __assetBrand guards against uninentional instantiation

type Asset = SpriteSheet |
    RenderBuffer |
    Code |
    AudioSample |
    Palette;

type SpriteSheet = ModuleBrand & {
    Palatte: Palette
}

type RenderBuffer = ModuleBrand & {}

type Code = {
    __assetBrand: never
}

type AudioSample = ModuleBrand & {
    SamplesCount: number,
    Channels: number,
    Frequency: number,
    /**
     * Length of the AudioSample in seconds
     */
    Length: number
}

type Palette = ModuleBrand & {}
