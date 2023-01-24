import { Typography } from 'antd'
import { Role, Section } from './App'

export const RolesData: Section[] = [
  {
    section: "Finance",
    roles: [
      { name: "Capitalist", description: "Take 4 coins from Treasury. All other players can then claim to be Capitalist. Following the resolution of any challenges, pay 1 coin to surviving Capitalist claimants", canBeBlocked: false },
      { name: "Speculator", description: "Take up to 5 coins from Treasury to double your current coins. If a challenge is successful, challenger receives all of your initial coins.", canBeBlocked: false },
      { name: "Banker", description: "Take 3 coins from Treasury.", canBeBlocked: false },
      { name: "Farmer", description: "Take 3 coins from Treasury, keep 2 and give 1 to another player.", canBeBlocked: false },
      { name: "Spy", description: "Take 1 coin from Treasury, then take a second action of the player’s choice. If the player has 10 coins after the first action, the second action must be a Coup.", canBeBlocked: false },
    ],
  },
  {
    section: "Communications",
    roles: [
      { name: "Director", description: "Draw 2 cards from Court, return any 2 cards to the Court.", canBeBlocked: false },
      { name: "Producer", description: "Take 1 card from Court and 1 from any target (target’s choice). Return any 1 card to court and target.", canBeBlocked: true },
      { name: "Writer", description: "Draw 1 card from the Court, then if desired, pay 1 coin to draw another. Return same number of cards to Court.", canBeBlocked: false },
      { name: "Newscaster", description: "Pay 1 coin to take 3 cards from the Court, then return any 3 cards to the Court.", canBeBlocked: false },
      { name: "Reporter", description: "Take one coin from Treasury and draw 1 card from the Court, then return one card to Court.", canBeBlocked: false },
    ]
  },
  {
    section: "Force",
    roles: [
      { name: "General", description: "Pay 5 coins to make all other targets lose 1 influence.", canBeBlocked: true },
      { name: "Crime Boss", description: "Player selects 1 target. The target can pay 2 coins to player to end player’s turn. Otherwise, player pays 5 coins, and target loses 1 influence.", canBeBlocked: false },
      { name: "Guerilla", description: "Pay 4 coins to Treasury to make a target lose 1 influence.", canBeBlocked: true },
      { name: "Judge", description: "Give 3 coins to a target, forcing them to lose a life. If successfully countered or challenged, target keeps the 3 coins.", canBeBlocked: true },
      { name: "Mercenary", description: "Pay 3 coins to place Disappear token on a chosen target. The target loses 1 influence after their next turn.", canBeBlocked: true },
    ]
  },
  {
    section: "Special Interest",
    roles: [
      { name: "Communist", description: "Steal up to 3 coins from the wealthiest target, giving them to the poorest player.", canBeBlocked: true },
      { name: "Customs Officer", description: "Take the 2 Tax tokens. Keep 1 in front of you to indicate you're receiving a payment. Place the other on a Role card (from the center of the table). All other players must pay 1 coin each time they claim that role.", canBeBlocked: false },
      { name: "Lawyer", description: "Claim all the coins of a player who is eliminated from the game.", canBeBlocked: false },
      { name: "Foreign Consular", description: "Take the 2 Treaty tokens. Keep 1, then give the other to another player of your choice. These two players become allies, and cannot target one another, even by Coup.", canBeBlocked: false },
      { name: "Intellectual", description: "Following a loss of influence, Intellectual takes 5 coins from Treasury. Successful challenge results in loss of another influence. Unsuccessful challenge results in challenger losing 1 influence.", canBeBlocked: false },
      { name: "Missionary", description: "Following a loss of influence (except by Coup), Missionary takes 1 card from Court. Successful challenge results in loss of second influence. Unsuccessful challenge results in challenger losing 1 influence.", canBeBlocked: false },
      { name: "Peace Keeper", description: "Take 1 coin and the Peacekeeper token. Holder of this token cannot be targeted except by Coup.", canBeBlocked: false },
      { name: "Politician", description: "Steal up to 2 coins from a chosen target.", canBeBlocked: true },
      { name: "Priest", description: "All other players must give Priest 1 coin (if able).", canBeBlocked: true },
      { name: "Protestor", description: "Pay 2 coins, select a target. Any other player may then pay 3 coins to force the target to lose 1 influence.", canBeBlocked: true },

    ]
  }
]

const roleDescRenderer = (data: Role) => {
  const { canBeBlocked, description, name } = data
  return <div>
    <Typography.Text>{description}</Typography.Text><br />
    <Typography.Text type={canBeBlocked ? "warning" : "secondary"}>{canBeBlocked ? `Blocked by ${name}` : "Cannot be blocked"}</Typography.Text>
  </div>
}

export const Columns = [
  { title: "Name", dataIndex: "name", render: (t: string) => t },
  { title: "Description", render: roleDescRenderer }
]
