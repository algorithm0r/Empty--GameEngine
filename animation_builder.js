class AnimationBuilder {
    constructor() {
        ANIMANAGER.addSpriteSheet('stones', ASSET_MANAGER.getAsset("stones.png"));
        ANIMANAGER.addSoloSprite('ground', 'stones', 0, 0, 960, 306);

        ANIMANAGER.addSpriteSheet('FULL', ASSET_MANAGER.getAsset("waluigi_sprites.png"));

        ANIMANAGER.addSpriteSet('runSet', 'FULL', 
                            [ 7, 41,  83, 123, 159, 190, 231, 271], // x orig
                            [39, 78, 119, 155, 188, 226, 264, 302], // x ends
                            57, 103); // y orig and height
        
        ANIMANAGER.addAnimation('runAni', 'runSet', [1, 2, 3, 4, 5, 6, 7, 0], 0.1);

        ANIMANAGER.addSpriteSet('smashSet', 'FULL',
                            [  6,  66, 132, 178, 242, 301], // x orig
                            [ 59, 123, 169, 233, 300, 356], // x ends
                            [418, 417, 398, 422, 422, 421], // y orig
                            462, // y ends
                            [0,-4,16,15,15,15], [0,-1,-20,3,3,3]);
        
        ANIMANAGER.addAnimation('smashAni', 'smashSet', [0, 1, 2, 3, 4, 5], 0.5);
/*
        ANIMANAGER.addSpriteSheet('smash', ASSET_MANAGER.getAsset("smash2.png"));
        ANIMANAGER.addSpriteSet('smashSet', 'smash', 0, 0, 467, 64, [0, 59, 125, 171, 235, 295, 357, 409])
        ANIMANAGER.addAnimation( 'smashAni', 'smashSet',
                        [   0,    1,    2,    3,    4,    5,    6,    2,    4,    5,    6,    7],  // sprite numbers
                        [0.36, 0.10, 0.10, 0.16, 0.09, 0.25, 0.15, 0.35, 0.09, 0.25, 0.10, 0.10]); // frame durations in sec.
*/
    }
}