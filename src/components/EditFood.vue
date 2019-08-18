<template>
    <div class="edit-food container" v-if="smoothie">
        <h2>Edit Food Recipie {{ smoothie.title }}</h2>
        <form @submit.prevent="editFood">
            <div class="field title">
                <label for="title">Food Title:</label>
                <input type="text" name="title" id="" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredients:</label>
                <input type="text" name="ingredient" id="" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add Ingredient: (Press tab to add)</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Food</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify'

export default {
    name: 'EditFood',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null,
        }
    },
    methods: {
        editFood() {
            if(this.smoothie.title) {
                this.feedback = null
                // create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                }).then(() => {
                    this.$router.push({ name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = 'Please enter the title'
            }
        },
        addIng() {
                if(this.another) {
                    this.smoothie.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                } else {
                    this.feedback = 'Enter at least one ingredient'
                }
            },
            deleteIng(ing) {
                this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                    return ingredient != ing
                })
            }
    },
    created() {
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.food_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style>
    .edit-food {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .edit-food h2 {
        font-size: 2em;
        margin: 20px;
    }
    .edit-food .field {
        margin: 20px auto;
        position: relative;
    }
    .edit-food .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>