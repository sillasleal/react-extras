# @ssl-lib/react-extras

*@ssl-lib/react-extras* is a library of components that allow the developer to create logic inside of JSX.

## List of conntents

- [Instalation](#instalation)
- [IfComponent](#ifcomponent)
    - [If](#if)
    - [ElseIf](#elseif)
    - [Else](#else)
    - [IfComponentProps](#ifcomponentprops)
- [For](#for) 
    - [ForProps](#forprops)
- [Switch](#switch)
    - [Case](#case)
    - [Default](#default)
    - [SwitchProps](#switchprops)
 
### Instalation

To install this lib use the command below:

```
    npm install --save @ssl-lib/react-extras
```

### IfComponent

This component allow the developer to create IF inside of JSX. It works like the if of JavaScript, you can define a test and if the test pass, the component inside of the IF will render. To use this componnent you need to define one or more children, the If, ElseIf or Else component. Look the exemple below:

```javascript
    <IfComponent>
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
    <IfComponent>
        <If test{true}>
            <label>Test 1 pass</label>
        </If>
    </IfComponent>
```

You can define the render component of two forms, like a child component:

```javascript

    <If test{true}>
        <label>Component to be render</label>
    </If>

```

Or like a function:

```javascript

    <If test{true}>
        {() => <label>Component to be render</label>}
    </If>

```

### ElseIf 

This component is similar to If, but this component never can be the first child of IfComponent.

```javascript
    <IfComponent>
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
    <IfComponent>
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
    const Title = (props) => <h1>{props.text}</h1>;
    const list = [1, 2, 3, 4, 5];
    const Test = () =>  <For of={list} to="text">
        <Title />
    </For>
```

The code above will create a list of H1 with 5 numbers. The props **to** define the props target in child component. You can define the child component like If, using a function or a component. See the exmeple below:

```javascript
    const Title = (props) => <h1>{props.text}</h1>;
    const list = [1, 2, 3, 4, 5];
    const Loop1 = () =>  <For each="text" in={list}>
        <Title />
     </For>
    const Loop2 = () =>  <For each="text" in={list}>
        {(item, key) => <Title key={key} text={item} />}
    </For>
```

### ForProps

Prop Name      | Type                | Required  | Obs
-------------- | ------------------- | --------- | ---
of             | Array               | YES       | The list of itens
to             | String              | NO        | The name of props target in child componet. If you want to insert the array item in the props "title" on child component, the value of the props **to** have to be "title".
children       | Element \| Function | NO        | If it is an Element, this will be rendered, if it is a function, this function will be executed and its return will be rendered. This function receive each item of Array and a key, like map method.

### License MIT