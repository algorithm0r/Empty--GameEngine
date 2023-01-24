class AnimationBuilder {
    constructor() {
        ANIMANAGER.addSpriteSheet('LINK', ASSET_MANAGER.getAsset('link.png'))
        ANIMANAGER.addSpriteSheet('OW_TILES', ASSET_MANAGER.getAsset('overworld_tiles.png'))


        //addSpriteSet(id, spriteSheet, x_origs, x_ends, y_origs, y_ends, x_offsets = 0, y_offsets = 0)
        ANIMANAGER.addSpriteSet('SET_link_run_south', 'LINK', 
                        [ 90, 122, 149, 174, 197, 223, 249, 272, 298],
                        [106, 138, 165, 190, 213, 239, 265, 288, 314],
                        11, 35);

        ANIMANAGER.addSpriteSet('env_grasses', 'OW_TILES',
                        [253, 270, 287, 304, 725],
                        [269, 286, 303, 320, 741],
                        [ 57,  57,  57,  57,  33],
                        [ 73,  73,  73,  73,  49]);

        ANIMANAGER.addSpriteSet('env_stones', 'OW_TILES', 
                        [759, 776],
                        [775, 792],
                        [67, 67],
                        [83, 83]);

        ANIMANAGER.addSpriteSet('env_sands', 'OW_TILES',
                        [83],
                        [99],
                        [299],
                        [315]);

        //addAnimation(id, spriteSetName, fSequence, fTiming, x_offset = 0, y_offset = 0) {
        ANIMANAGER.addAnimation('ANIMA_link_run_south', 'SET_link_run_south', [1,2,3,4,5,6,7], 0.1);


    }
}