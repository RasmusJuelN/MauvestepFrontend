import CharacterCard from "@/components/game-mechanics/CharacterCard";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
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
    description: "A seasoned warrior forged in the crucible of battle. With unwavering resolve and immense strength, the Fighter excels at absorbing punishment and protecting their team. Their superior defense and pool of health make them an ideal front-line combatant, drawing enemy fire while allies coordinate effective strikes. Masters of heavy weaponry and shield techniques, Fighters can turn the tide of battle through overwhelming determination and tactical positioning.",

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
    description: "A scholar of the arcane arts, the Mage harnesses primal magical forces to unleash devastation upon their foes. From the safety of the back lines, they conjure spells of immense destructive power, controlling the battlefield through elemental magic and area-of-effect attacks. Their mastery over frost, flame, and pure magical energy makes them a force to be reckoned with. Though fragile in comparison to warriors, their ability to deal massive damage from afar makes them invaluable to any team.",

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
    description: "A beacon of hope on the battlefield, the Cleric draws upon divine power to heal and protect their companions. With their restorative magics and supportive abilities, Clerics ensure the team survives even the most grueling encounters. They can mend wounds, cleanse debuffs, and even deal damage while supporting allies. Their presence is often the difference between victory and defeat, as they maintain team morale and keep everyone standing when hope seems lost.",

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
    description: "A child of the wilderness, the Ranger commands nature itself as a weapon. With bow in hand and instincts honed by years in the wild, they strike with precision from mid-range, delivering consistent damage while maintaining distance from danger. Rangers can set traps, summon natural spirits, and rain arrows upon enemies with devastating accuracy. Their versatility and connection to nature make them adaptable hunters capable of handling any tactical situation with cunning and grace.",

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
    <PageHeader title="Game Mechanics" />
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
          {/* {index < characters.length - 1 && <Separator />} */}
            </div>
        ))
        }
           
    </div>
        
    </PageContainer>
  )
}