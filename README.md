# @ssl-lib/react-extras

*@ssl-lib/react-extras* is a library of components created to reduce the code of your app.

## List of conntents

- [Instalation](#instalation)
- [IfComponent](#ifcomponent)
    - [If](#if)
    - [ElseIf](#elseif)
    - [Else](#else)
    - [IfComponentProps](#ifcomponentprops)
- [For](#for)
    - [ForProps](#forprops)
- [Translate](#translate)
    - [SetLang](#setLang)
    - [TranslateProps](#translateProps)


### Instalation

To install this lib use the command below:

```
    npm install --save @ssl-lib/react-extras
```

### IfComponent

This component allow the developer to create IF inside of JSX. It works like the if of JavaScript, you can define a test and if the test pass, the component inside of the IF will render. To use this componnent you need to define one or more children, the If, ElseIf or Else component. Look the exemple below:

```javascript
    import { IfComponent, If, ElseIf, Else } from "@ssl-lib/react-extras";

    const Test = () => <IfComponent>
        <If test{false}>
            <label>Test 1 pass</label>
        </If>
        <ElseIf test={true}>
            <label>Test 2 pass</label>
        </ElseIf>
        <Else>
            <label>Test 1 and Test 2 failed</label>
        </Else>
    </IfComponent>
```

### If

This is the first test to be realized by the IfComponent. You need to define a test in this component, if the test pass, the children will be render. You need to define this component before the others, always like the first child of IfComponent.

```javascript
    import { IfComponent, If, ElseIf, Else } from "@ssl-lib/react-extras";

    const Test = () => <IfComponent>
        <If test{true}>
            <label>Test 1 pass</label>
        </If>
    </IfComponent>
```

You can define the render component of two forms, like a child component:

```javascript

    <If test{true}>
        <label>Component to render</label>
    </If>

```

Or like a function:

```javascript

    <If test{true}>
        {() => <label>Component to render</label>}
    </If>

```

### ElseIf

This component is similar to If, but this component never can be the first child of IfComponent.

```javascript
    import { IfComponent, If, ElseIf, Else } from "@ssl-lib/react-extras";

    const Test = () => <IfComponent>
        <If test{false}>
            <label>Test 1 pass</label>
        </If>
        <ElseIf test={true}>
            <label>Test 2 pass</label>
        </ElseIf>
    </IfComponent>
```

You can see the list of props [here](#ifcomponentprops).

### Else

This is a Else, it is used of the same form like the else in JavaScript. This component only can be define like the last child of IfComponet. It is only default result when all tests fail.

```javascript
    import { IfComponent, If, ElseIf, Else } from "@ssl-lib/react-extras";

    const Test = () => <IfComponent>
        <If test{false}>
            <label>Test 1 pass</label>
        </If>
        <ElseIf test={false}>
            <label>Test 2 pass</label>
        </ElseIf>
        <Else>
            <label>Test 1 and Test 2 failed</label>
        </Else>
    </IfComponent>
```

### IfComponentProps

Prop Name      | In               | Type                | Required   | Obs
-------------- | ---------------- | ------------------- | ---------- | ---
test           | IF\|ElseIf       | boolean             | NO         | The default is FALSE
children       | IF\|ElseIf\|Else | Element \| Function | YES        | If it is an Element, this will be rendered, if it is a function, this function will be executed and what its return will be rendered.

### For

The For component work like a ForEach of the PHP, you define a list e the props name that will be insert in each child. You can define the child like child or via props, like IfComponent. See the exemple below:

```javascript
    import { For } from "@ssl-lib/react-extras";

    const Title = (props) => <h1>{props.text}</h1>;
    const list = [1, 2, 3, 4, 5];
    const Test = () =>  <For of={list} to="text">
        <Title />
    </For>
```

The code above will create a list of H1 with 5 numbers. The props **to** define the props target in child component. You can define the child component like If, using a function or a component. See the exmeple below:

```javascript
    import { For } from "@ssl-lib/react-extras";

    const Title = (props) => <h1>{props.text}</h1>;
    const list = [1, 2, 3, 4, 5];
    const Loop1 = () =>  <For of={list} to="text">
        <Title />
     </For>
    const Loop2 = () =>  <For of={list}>
        {(item, key) => <Title key={key} text={item} />}
    </For>
```

### ForProps

Prop Name      | Type                | Required  | Obs
-------------- | ------------------- | --------- | ---
of             | Array               | YES       | The list of itens
to             | String              | NO        | The name of props target in child componet. If you want to insert the array item in the props "title" on child component, the value of the props **to** have to be "title".
children       | Element \| Function | NO        | If it is an Element, this will be rendered, if it is a function, this function will be executed and its return will be rendered. This function receive each item of Array and a key, like map method.

### TranslateProvider

TranslateProvider is provider for Translate componente, a i18N component. Use TranslateProvider to set the lang and dictionary in your project. Look the exemple bellow.

```javascript
    import { TranslateProvider } from "@ssl-lib/react-extras";

    const dictionary = {
        pt: {
            HI: "Oi"
        },
        pt-BR:{
            FRIEND: "Amigo"
        }
    };

    const App = () => <TranslateProvider language="pt-BR" errorLanguage="pt" dictionary={dictionary}>
        <div></div>
    </TranslateProvider>;
```

After you set the values of props, you can access the dictionary in others componentes of your project. In this provider, you set 3 props, "dictionary", "errorLanguage" and "language". Use "dictionary" to set all keys to be used in your project, "language" is the default language of your project and "errorLanguage" is used when the Translate doesn`t find the key on dictionary of default language. The props "language" is not obligatory, if you dont set "language" the provider will use the language of the browser.

```javascript
    import { TranslateProvider } from "@ssl-lib/react-extras";

    const dictionary = {
        pt: {
            HI: "Oi"
        },
        pt-BR:{
            FRIEND: "Amigo"
        }
    };

    const App = () => <TranslateProvider errorLanguage="pt" dictionary={dictionary}>
        <div>Auto detect language</div>
    </TranslateProvider>;
```

### Translate

The component Translate is used to access the keys of the dictionary of project. This component is a consumer of TranslateProvider, and only work inside the other component.

```javascript
    import { TranslateProvider, Translate } from "@ssl-lib/react-extras";

    const dictionary = {
        pt: {
            HI: "Oi",
            FRIEND: "Amigo"
        }
    };

    const Text = () => <div>
        <Translate>HI</Translate>{" "}<Translate>FRIEND</Translate>
    </div>;

    const App = () => <TranslateProvider errorLanguage="pt" dictionary={dictionary}>
        <Text />
    </TranslateProvider>;
```

The code above render a div with the text "Oi Amigo".

The Translate allow you set a especific dictionary for your component. This allow you create isolateds componentes, with this you can export the full component for other projects. Look.

```javascript
    import { TranslateProvider, Translate } from "@ssl-lib/react-extras";

    const dictionary = {
        pt: {
            HI: "Oi"
        }
    };

    const dictionaryTranslate = {
        pt: {
            FRIEND: "Amigo"
        }
    };

    const Text = () => <Translate dictionary={dictionaryTranslate}>
        {(translate) => <div>{translate("HI")}{" "}{translate("FRIEND")}</div>}
    </Translate>

    const App = () => <TranslateProvider errorLanguage="pt" dictionary={dictionary}>
        <Text />
    </TranslateProvider>;
```

The code above render a div with the text "Oi Amigo". The same text of the last exemplo, but each word is in one diferent dictionary. The component Text have a especific dictionary, the Translate make a mix of the especific dictionary of Text and the global dictionary.
Using this, you can create exportables full components, and in your next project you can import the component with the language dictionary, like this:
```stylesheet
    # Button.css
    .Button{
        background-color: red;
    }
```

```javascript
    // dictionary.js
    export default {
        pt-BR: {
            SAVE: "Salvar"
        },
        en: {
            SAVE: "Save"
        },
        es: {
            SAVE: "Salvar"
        }
    }
```

```javascript
    // Button.js
    import { Translate } from "@ssl-lib/react-extras";
    /**/
    import dictionary from "./dictionary";
    import "./Button.css";

    export default ({onClick}) => <Translate dictionary={dictionary}>
        {(translate) => <button className="Button" onClick={onClick}>{translate("SAVE")}}</button>}
    </Translate>;
```

```javascript
    // Button.test.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Button from './Button';

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Button />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
```

The extructuring of directory will be something like this:

```text
Button/
    ├── Button.js
    ├── Button.css
    ├── dictionary.js
    └── Button.test.js
```

This allow you export and reuse the full component. The Translate will use the global language definition.

### SetLang

This component is responsable to change the language of project. It receive a String or a function in children props.
```javascript
    // Button.js
    import { SetLang } from "@ssl-lib/react-extras";
    /**/
    import dictionary from "./dictionary";
    import "./Button.css";

    const set1 = () => <SetLang>pt-BR</SetLang>;
    const set2 = () => <SetLang>{(setLang) => <a onClick={() => setLang('pt-BR')}>Português</a>}</SetLang>
```

When the language change, all components that use Translate will be update. The new language need to exists in dictionary, if not exists, the translate return the key.

Obs: Many countres use same languages, but with variations, for exemple Brazil and Portugal, in Portugal "hi" is "oi" and in Brazil too, but is not valid to all words. For this cases you can set a * to language, for exemple:

```javascript
    // dictionary.js
    export default {
        'pt-BR': {
            goatee: "cavanhaque"
        },
        pt: {
            goatee: "pêra"
        },
        'pt-*':{
            COFFE: "café"
        }
    }
```

In the dictionary above, the key COFFE is used for all variations of portuguese, and each other language have a especific value to goatee, because in Brazil goatee is cavanhaque and in Portugal is pear. Tha same idea is valid for a global dictionary, you can set a key * with all keys to use in all language.

```javascript
    // dictionary.js
    export default {
        'pt-BR': {
            goatee: "cavanhaque"
        },
        pt: {
            goatee: "pêra"
        },
        'pt-*':{
            COFFEE: "café"
        },
        '*': {
            GERAL: 'geral'
        }
    }
```

### TranslateProps

Used in          | Prop Name      | Type                | Required  | Obs
---------------- |----------------| ------------------- | --------- | ---
TranslateProvider|dictionary      | object              | NO        |
TranslateProvider|language        | string              | NO        | If is not define, the provider will get the browser language
TranslateProvider|errorLanguage   | string              | YES       | Used if the provider can`t detect language of browser
Translate        | children       | function\|string    | YES       | If is string, the string have to be a key of dictionary, if is a function, this function receive the translate function like parameter.
Translate        | dictionary     | object              | NO        | Use to set a especific dictionary of component.
SetLang          | children       | function\|string    | YES       | If is a string, the string is the new language, if is a function, this functon receive a function setLang like parameter.

### License MIT
