import CharacterCard from "@/components/game-mechanics/CharacterCard";
import PageContainer from "@/components/layout/PageContainer";
import clericCharacterImage from "@/assets/images/characters/cleric_character.png";
import fighterCharacterImage from "@/assets/images/characters/fighter_character.png";
import mageCharacterImage from "@/assets/images/characters/mage_character.png"; 
import rangerCharacterImage from "@/assets/images/characters/ranger_character.png";
import slashAbilityImage from "@/assets/images/abilities/slash_ability.png";
import rallyAbilityImage from "@/assets/images/abilities/rally_ability.png";
import blockAbilityImage from "@/assets/images/abilities/block_ability.png";
import frostspearAbilityImage from "@/assets/images/abilities/frostspear_ability.png";
import scytheAbilityImage from "@/assets/images/abilities/scythe_ability.png";
import iceSpikesAbilityImage from "@/assets/images/abilities/icespikes_ability.png";
import debuffAbilityImage from "@/assets/images/abilities/debuff_ability.png";
import healAbilityImage from "@/assets/images/abilities/heal_ability.png";
import cursedBlastAbilityImage from "@/assets/images/abilities/cursedblast_ability.png";
import magicArrowAbilityImage from "@/assets/images/abilities/magicarrow_ability.png";
import naturesCallAbilityImage from "@/assets/images/abilities/naturescall_ability.png";
import hailOfArrowsAbilityImage from "@/assets/images/abilities/hailofarrows_ability.png";
import Separator from "@/components/shared/Separator";


const characters = [
  {
    name: "Fighter",
    role: "Tank",
    description: "High defense and health, excels in close combat.",
    image: fighterCharacterImage,
    abilities: [
      {
        title: "Slash",
        description: "A powerful melee attack that deals significant damage.",
        damage: 15,
        apCost: 10,
        apGain: 0,
        hpGain: 0,
        image: slashAbilityImage,
      },
      {
        title: "Block",
        description:
          "Raises shield to block incoming attacks, reducing damage taken.",
          damage: 0,
        apCost: 8,
        apGain: 0,
        hpGain: 12,
        image: blockAbilityImage,
      },
      {
        title: "Rally",
        description:
          "Boosts morale of nearby allies, increasing their attack power.",
           damage: 0,
        apCost: 0,
        apGain: 20,
        hpGain: 5,
        image: rallyAbilityImage,
      },
    ],
  },
  {
    name: "Mage",
    role: "DPS",
    description: "Uses powerful spells to deal damage from a distance.",
    image: mageCharacterImage,
    abilities: [
      { title: "Frost Spear",
        description: "Launches a spear of ice that slows enemies.",
        damage: 15,
        apCost: 7,
        apGain: 0,
        hpGain: 0,
        image: frostspearAbilityImage },
      { title: "Scythe",
        description: "A sweeping attack that hits multiple enemies.",
        damage: 12,
        apCost: 10,
        apGain: 0,
        hpGain: 5,
        image: scytheAbilityImage },
      { title: "Ice spikes", 
        description: "Summons a storm of ice to impale enemies",
        damage: 20,
        apCost: 13,
        apGain: 0,
        hpGain: 0,
        image: iceSpikesAbilityImage },
    ],
  },
  {
    name: "Cleric",
    role: "Support",
    description: "Restores health and provides buffs to allies.",
    image: clericCharacterImage,
    abilities: [
      { title: "Debuff",
        description: "Reduces the effectiveness of enemy attacks.",
        damage: 4,
        apCost: 8,
        apGain: 0,
        hpGain: 6,
        image: debuffAbilityImage },
      { title: "Heal", 
        description: "Restores health to an ally.",
        damage: 0,
        apCost: 12,
        apGain: 0,
        hpGain: 18,
        image: healAbilityImage },
      { title: "Cursed Blast", 
        description: "Damages enemies and heals allies in an area.",
        damage: 10,
        apCost: 15,
        apGain: 0,
        hpGain: 10,
        image: cursedBlastAbilityImage },
    ],
  },
  {
    name: "Ranger",
    role: "DPS",
    description: "Skilled with bows and traps, effective at mid-range combat.",
    image: rangerCharacterImage,
    abilities: [
      { title: "Magic arrow", 
        description: "Fires a magical arrow that pierces through enemies.",
        damage: 14,
        apCost: 9,
        apGain: 0,
        hpGain: 0,
        image: magicArrowAbilityImage },
      { title: "Nature's Call",
        description: "Summons the spirit of the forest to help in battle.",
        damage: 8,
        apCost: 5,
        apGain: 10,
        hpGain: 7,
        image: naturesCallAbilityImage },
      { title: "Hail of arrows",
        description: "Rains a volley of arrows on a wide area, damaging all enemies caught in it.",
        damage: 18,
        apCost: 14,
        apGain: 0,
        hpGain: 0,
        image: hailOfArrowsAbilityImage },
    ],
  },
];

export default function GameMechanicsPage() {
  return (
    // TODO: Add functionality to fetch and create characters and abilities from backend instead of hardcoding them .
    <PageContainer>
    <div className="flex items-center justify-center gap-3 mb-6">
          <h2 className="text-3xl text-indigo-500 font-semibold text-center">Game Mechanics</h2>
        </div>
        
        <p className="text-center text-indigo-300 mb-8">
          Learn about the core mechanics including combat systems, resource management and details about the characters&apos; and bosses&apos; abilities and tactics.
        </p>
    <div className="space-y-2">
        {characters.map((character, index) => (
            <div key={character.name}>
          <CharacterCard
            key={character.name}
            name={character.name}
            role={character.role}
            image={character.image}
            description={character.description}
            abilities={character.abilities}
          />
          {index < characters.length - 1 && <Separator />}
            </div>
        ))
        }
           
    </div>
        
    </PageContainer>
  )
}