function getRandomValue(min,max){
    return Math.floor(Math.random() * (max-min)) +min
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: '',
            logs: []
        }
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound %3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if(value<=0 && this.monsterHealth <=0){
                this.winner = 'draw'
            } else if(value<=0){
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth <=0){
                this.winner = 'draw'
            }else if (value<=0){
                this.winner = 'player'
            }
        }
    },
    methods: {
        startGame(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.winner = ''
            this.currentRound = 0
            this.logs = []
        },
        attackMonster(){
            this.currentRound+=1
            const attackValue = getRandomValue(5,12)
            this.monsterHealth -= attackValue
            this.addLog('player','attack',attackValue)
            this.attackPlayer()
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15)
            this.playerHealth -= attackValue
            this.addLog('monster','attack',attackValue)

        },
        specialAttack(){
            this.currentRound+=1
            const attackValue = getRandomValue(15,25)
            this.monsterHealth -= attackValue
            this.addLog('player','Special Attack',attackValue)
            this.attackPlayer()
        },
        healPlayer(){
            if(this.playerHealth === 100){
                alert("Health already full")
                return
            }
            const healValue = getRandomValue(8,20)
            if(this.playerHealth + healValue >100){
                this.playerHealth = 100
                this.addLog('player','heal',100-healValue)
            }else{
            this.playerHealth += healValue
            this.addLog('player','heal',healValue)
            }
            this.currentRound++
            this.attackPlayer()
        },
        surrender(){
            this.winner = 'monster'
        },
        addLog(who,what,value){
            this.logs.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
});
app.mount("#game")