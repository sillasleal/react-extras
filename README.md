# @ssl/react-extras

*@ssl/react-extras* is a library of components that allow the developer to create logic inside of JSX.

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
 - [Container](#container)

### Instalation

To install this lib use the command below:

```
    npm install --save @ssl/react-extras
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

This is the first test to be realized by the IfComponent. You need to define a test in this component, if the test pass, the children or the component define in props component will be render. You need to define this component before the others, always like the first child of IfComponent.

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

Or using the props **component**. When you define the render componnent like a child, this will be processed when the IfComponent was render. Using the props **component** this not happen because the componnent to be render by the test will be create only if the test pass. You can see the list of props [here](#ifcomponentprops).

```javascript
    <If test{true} component={label} />
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

Like the If, ElseIf componente allow to define the render component via child or props **component**.

```javascript
    <ElseIf test{true} component={label} />
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

Prop Name      | In               | Type           | Required | Obs
-------------- | ---------------- | -------------- | -------- | ---
test           | IF\|ElseIf       | boolean        | NO       | The default is FALSE
children       | IF\|ElseIf\|Else | Element \| Function         | NO       | If it is an Element, this will be rendered, if it is a function, this function will be executed and its return will be rendered.
component      | IF\|ElseIf\|Else | Element             | NO       | If it was defined, the props children will be igored
componentProps | IF\|ElseIf\|Else | Object \| function  | NO       | Only used with props component. This props allow you to pass props to component that will be render. If you pass a object, it will be insert in the new component, if you inform a function, this need to return a object that will be insert in the new component.

### Exemple using props

```javascript
    const Title = (props) => <h1>{props.text}</h1>;
    const Default = () => <Title text="All fail" />;

    const Test = ({test}) =>  <IfComponent>
        <If test={test === 1} component={Title} componentProps={{
            text: "Test 1 pass"
        }}/>
        <ElseIf test={test === 2} component={Title} componentProps={() => ({
            text: "Test 2 pass"
        })}/>
        <ElseIf test={test === 3}>
            <Title text="Test 3 pass" />
        </ElseIf>
        <ElseIf test={test === 4}>
            {() => <Title text="Test 4 pass" />}
        </ElseIf>
        <Else component={Default} />
    </IfComponent>
```

### For

The For component work like a ForEach of the PHP, you define a list e the props name that will be insert in each child. You can define the child like child or via props, like IfComponent. See the exemple below:

```javascript
    const Title = (props) => <h1>{props.text}</h1>;
    const list = [1, 2, 3, 4, 5];
    const Test = () =>  <For each="text" in={list}>
        <Title />
    </For>
```

The code above will create a list of H1 with 5 numbers. The props **each** define the props target in child component. Like IfComponent, when you define a child like that can hapens a error, because the child component will be render together with For. You can define the child component like If, usinng props **component** annd pass your props via props **componentProps**. See the exmeple below:

```javascript
    const Title = (props) => <h1>{props.text}</h1>;
    const list = [1, 2, 3, 4, 5];
    const Loop1 = () =>  <For each="text" in={list} component={Title} componentProps={each => ({
        title: each
    })}/>
    const Loop2 = () =>  <For each="text" in={list}>
        <Title />
     </For>
    const Loop3 = () =>  <For each="text" in={list}>
        {(item, key) => <Title key={key} text={item} />}
    </For>
```

### ForProps
Prop Name      | Type                | Required  | Obs
-------------- | ------------------- | --------- | ---
in             | Array               | YES       | The list of itens
children       | Element \| Function | NO        | If it is an Element, this will be rendered, if it is a function, this function will be executed and its return will be rendered. This function receive each item of Array and a key, like map method.
each           | String              | YES       | The name of props target in child componet. If you want to insert the array item in the props "title" on child component, the value of the props **each** have to be "title".
component      | Element             | NO        | If it was defined, the props children will be igored
componentProps | function            | NO        | Only used with props component. This function receive the item of Array and need to return a object that will be insert in new component.

### Switch

The Switch component is similar to javascript switch. It has a similar syntax and work like a real switch. It element has two sub-components, Case and Default, both work like real case and default in switch/case. Look below a exemple os use:

```javascript
    const Title = (props) => <h1>{props.text}</h1>;
    const Switch = () =>  <Switch value={a}>
        <Case value={1}>
            <Title text="Value 1" />
        </Case>
        <Case value={2} break>
            {() => <Title text="Value 2" />}
        </Case>
        <Default>
            <Title text="Default value" />
        </Defaut>
    </Switch>
```

### Case

The case element works like a real javascript case. You need to set props value, this props will be used to test the switch value. You can set too the break props to stop test values in others cases in switch.

```javascript
    const Title = (props) => <h1>{props.text}</h1>;
    const Switch = () =>  <Switch value={a}>
        <Case value={1}>
            <Title text="Without break" />
        </Case>
        <Case value={2}>
            <Title text="Other without break" />
        </Case>
         <Case value={3} break>
            <Title text="with break" />
        </Case>
    </Switch>
```

### Default

The default component of switch is used to render the element if no one other test pass in case.

### SwitchProps

Prop Name      | In            |  Type               | Required  | Obs
-------------- | ------------- |-------------------- | --------- | ---
value          | Switch        | mixed               | YES       | The value to be used to test in case elements
value          | Case          | mixed               | YES       | The value used to test with switch value
break          | Case          | boolean             | NO        | Used to break the tests
children       | Case\|Default | Element \| Function | YES       | The element to be render

### Container

The Container component allow that you insert many components without a div or span to involve they. For exemple, if you need to print 5 divs inside a ternary, in normal case you will put a div or span, or other component, and when the ternary is processed, the component will have a div and other inside. With Container this not happen.

```javascript
    const Switch = () =>  <Container>
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </Container>
```

The code above will create a virtual dom like this:

```html
        <div>1</div>
        <div>2</div>
        <div>3</div>
```

### License MIT