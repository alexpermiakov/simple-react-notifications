# Simple-React-Notifier

Simple-React-Notifier allow you to add notifications to your app. It has very tiny size (1kb gzip),
we don't want to blow our bundle size because of notifications, right?

Despite the tiny size, it supports:

- [Rendering success and error default notification](#rendering-success-and-error-default-notifications)
- [Rendering user defined component](#rendering-user-defined-component)
- [Positioning](#positioning)
- [Configuring all in one place](#configuring-all-in-one-place)
- [Animation](#animation)
- [Remove notification items programmatically](#remove-notification-items-programmatically)

## Installation

```
$ npm install simple-react-notifier
$ yarn add simple-react-notifier
```

## Usage

### Rendering success and error default notification

Notifier has a few built-in components for displaying an error or a successfull operation:

```javascript
import React, { Component } from "react";
import notifier from "simple-react-notifier";
import "simple-react-notifier/dist/index.css";

const App = () => (
  <div>
    <button
      onClick={() => {
        notifier.success("Your items have been updated");
        notifier.error("Something went wrong, try again.");
      }}
    >
      Lets render a default component
    </button>
  </div>
);
```

### Rendering user defined component

The real power comes with rendering our own component. In this case it's not even a notification, just a view with real data:

```javascript
const RouteInfo = ({ header, onClosePanel }: any) => (
  <div className="route-info">
    <h3>{header}</h3>
    <p>
      Bicycle 2.4 km, 8 min. Use caution - may involve errors or sections not
      suited for bicycling
    </p>
    <ol>
      <li>Head east toward Success Rd</li>
      <li>Continue onto High Bridge Rd</li>
      <li>Slight left to stay on Jackson Mills Rd</li>
      <li>At the traffic circle, take the 3rd exit onto Crine Rd</li>
    </ol>
    <button onClick={onClosePanel}>Close info panel</button>
  </div>
);
```

Put the css below in your .css file. It completely up to us how we can add styles. We can use styled-components or whatever we like. The notify() method will just render it.

```css
.route-info {
  height: 400px;
  background: white;
  color: black;
  padding: 8px 16px;
  position: relative;
}

.route-info ol {
  padding: 0 0 0 16px;
}

.route-info ol li {
  margin-bottom: 8px;
}

.route-info button {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 2em;
  text-decoration: none;
  color: #ffffff;
  background-color: #4eb5f1;
  text-align: center;
  border: none;
  position: absolute;
  bottom: 16px;
  right: 16px;
}
```

And now we can use it like this:

```javascript
const App = () => (
  <div>
    <button
      onClick={() =>
        notifier({
          render: ({ id, onClose }) => (
            <RouteInfo
              key={id}
              onClosePanel={onClose}
              header={"The shortest way to ride home."}
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

As you can see here, render() receives onClose callback, which we have to provide and call inside our component in order to close the notification.

### Positioning

Instead of specifing all params again and again for each item, we can put it in one place:

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

### Configuring all in one place

Instead of specifing all params again and again for each item, we can put it in one place:

```javascript
notifier.configure({
  autoClose: 5000,
  position: "top-center",
  delay: 1000,
  single: true,
  containerWidth: "480px"
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
      Display an item with 1 second delay. Now it is done in configure()
    </button>
  </div>
);
```

Params in notifier function will override their default values in configure().

By default, all items will be positioned in the top right corner.
The following values are allowed: top-right, top-center, top-left, bottom-right, bottom-center, bottom-left

### Animation

First, define you css-animation somewhere in your .css file:

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

Second, specify it during the notifier() call or in configure():

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
          position: "top-center",
          animation: {
            in: "fadeIn",
            out: "fadeOut",
            duration: 600
          }
        });
      }}
    >
      Show two of them in different places
    </button>
  </div>
);
```

You can omit the duration param. The default value (400ms) will be used.

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
