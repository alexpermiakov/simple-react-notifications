## Installation

```
$ npm install simple-react-notifier
$ yarn add simple-react-notifier
```

## Usage

### We have to provide the component to render

```javascript
import React, { Component } from "react";
import notifier from "simple-react-notifier";
import "simple-react-notifier/dist/index.css";

const App = () => (
  <div>
    <button
      onClick={() =>
        notifier({
          render: () => <div>Hi!</div>
        })
      }
    >
      Notify with just a text message!
    </button>
  </div>
);
```

### Let's render a notification component, so first let's define it:

```javascript
const Notification = ({ message, onClose }: any) => (
  <div className="item info">
    <span>ℹ {message}</span>
    <button onClick={onClose}>✖</button>
  </div>
);
```

```css
.simple-react-notifier .item {
  position: relative;
  background: #3498db;
  color: white;
  min-height: 48px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 1px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.simple-react-notifier .item span {
  margin: 0 20px 0 10px;
}

.simple-react-notifier .item button {
  cursor: pointer;
  color: white;
  background: transparent;
  border: 0;
  opacity: 0.7;
  position: absolute;
  top: 8px;
  right: 8px;
}
```

```javascript
const App = () => (
  <div>
    <button
      onClick={() =>
        notifier({
          render: ({ key, onClose }) => (
            <Notification
              key={id}
              onClose={onClose}
              message={"Check this out, looks great!"}
            />
          )
        })
      }
    >
      Notify with just a text message!
    </button>
  </div>
);
```

##### As you can see here, render() receives onClose callback, which we have to provide and call inside our component in order to close the notification.

#### Now we can add more properties:

```javascript
const App = () => (
  <div>
    <button
      onClick={() =>
        notifier({
          autoClose: 5000,
          position: "top-center",
          delay: 1000,
          render: ({ key, onClose }) => (
            <Notification
              key={id}
              onClose={onClose}
              message={"Check this out, looks great!"}
            />
          )
        })
      }
    >
      Display an item with 1 second delay
    </button>
  </div>
);
```

#### Instead of specifing all params again and again for each item, we can put it in one place:

```javascript
notifier.configure({
  autoClose: 5000,
  position: "top-center",
  delay: 1000
});

const App = () => (
  <div>
    <button
      onClick={() =>
        notifier({
          render: ({ key, onClose }) => (
            <Notification
              key={id}
              onClose={onClose}
              message={`The current second is: ${new Date().getSeconds()}`}
            />
          )
        })
      }
    >
      Display an item with 1 second delay. Now it's done in configure()
    </button>
  </div>
);
```

#### Params in notifier function will override their default values in configure().

### Positioning

#### Instead of specifing all params again and again for each item, we can put it in one place:

```javascript
notifier.configure({
  render: ({ key, onClose }) => (
    <Notification
      key={id}
      onClose={onClose}
      message={`It will display the same message for all notification items`}
    />
  )
});

const App = () => (
  <div>
    <button
      onClick={() => {
        notifier({
          position: "top-left"
        });

        notifier({
          position: "top-center"
        });
      }}
    >
      Show two of them in different places
    </button>
  </div>
);
```

#### By default, all items will be positioned in the top right corner.

#### The following values are allowed: top-right, top-center, top-left, bottom-right, bottom-center, bottom-left

### If we want to display only single message:

```javascript
notifier.configure({
  autoClose: 5000,
  position: "top-center",
  delay: 1000,
  single: true
});
```

### You might want to change the container's width:

```javascript
notifier.configure({
  autoClose: 5000,
  position: "top-center",
  delay: 1000,
  single: true,
  containerWidth: "480px"
});
```

### Animation

#### First, define you css-animation somewhere in your .css file:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

#### Second, specify it during the notifier() call or in configure():

```javascript
notifier.configure({
  render: ({ key, onClose }) => (
    <Notification
      key={id}
      onClose={onClose}
      message="Your items have been updates"
    />
  )
});

const App = () => (
  <div>
    <button
      onClick={() => {
        notifier({
          position: "top-left",
          animation: {
            in: "fadeIn",
            out: "fadeOut",
            duration: 400
          }
        });
      }}
    >
      Show two of them in different places
    </button>
  </div>
);
```

#### You can omit the duration param. The default value (400ms) will be used.

### Remove notification items programmatically

```javascript
import React, { Component } from "react";
import notifier from "simple-react-notifier";

notifier.configure({
  render: ({ key, onClose }) => (
    <Notification
      key={id}
      onClose={onClose}
      message="Your items have been updates"
    />
  )
});

class App extends Component {
  id = null;

  render() {
    return (
      <div>
        <button onClick={() => (this.id = notifier())}>Notify</button>
        <button onClick={() => notifier.dismiss(this.id)}>Dismiss</button>
        <button onClick={() => notifier.dismiss()}>Dismiss all</button>
      </div>
    );
  }
}
```
