# Simple-React-Notifications

Tiny library (only 1kb gzip) that allows you to add notifications to your app.
We don't want to blow up our bundle size because of notifications, right?

## Demo

https://alexpermyakov.github.io/simple-react-notifications/

Despite the small size, it supports:

- [Rendering success and error default notifications](#rendering-success-and-error-default-notifications)
- [Rendering user defined component](#rendering-user-defined-component)
- [Positioning](#positioning)
- [Configuring all in one place](#configuring-all-in-one-place)
- [Animation](#animation)
- [Remove notification items programmatically](#remove-notification-items-programmatically)

## Installation

```
$ npm install simple-react-notifications
$ yarn add simple-react-notifications
```

## Usage

### Rendering success and error default notifications

Notifier has a few built-in components for displaying an error or a successfull operation:

```javascript
import React from "react";
import notifier from "simple-react-notifications";
import "simple-react-notifications/dist/index.css";

const App = () => (
  <div>
    <button
      onClick={() => {
        notifier.success("Your items have been updated");
        // notifier.error("Something went wrong, try again.");
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
const RouteInfo = ({ header, onClosePanel }) => (
  <div
    className="route-info"
    onClick={onClosePanel}
    style={{
      height: "200px",
      background: "#54cea7",
      color: "white",
      padding: "8px 16px",
      position: "relative",
      boxShadow: "rgba(0, 0, 0, 1) 0px 0px 14px 2px"
    }}
  >
    <h3 className="subtitle">{header}</h3>
    <p>Bicycle 2.4 km, 8 min.</p>
    <p>Use caution - may involve errors or sections not suited for bicycling</p>
    <button
      className="button"
      style={{ position: "absolute", bottom: "16px", right: "16px" }}
    >
      Use this route
    </button>
  </div>
);
```

It completely up to us the way we add styles. We can use styled-components or whatever we like. The notify() method will just render it:

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

As you can see here, render() receives onClose callback, which we have to pass inside our component in order to close the notification when user click on the button.

### Positioning

By default, all items will be positioned in the top right corner. The following values are allowed: top-right, top-center, top-left, bottom-right, bottom-center, bottom-left.

```javascript
const App = () => (
  <div>
    <button
      onClick={() => {
        // notifier({
        //   position: "top-left"
        // });

        notifier({
          single: true, // display only the latest item
          position: "top-center",
          render: ({ id, onClose }) => (
            <RouteInfo
              key={id}
              onClosePanel={onClose}
              header={"The shortest way to ride home."}
            />
          )
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
  autoClose: 2000,
  position: "top-center",
  delay: 500,
  single: false,
  width: "480px"
});

const App = () => (
  <div>
    <button
      onClick={() => {
        notifier.success("Your items have been updated");
      }}
    >
      Display an item with 500 ms delay. Now it is done in configure()
    </button>
  </div>
);
```

Params in notifier function will override their default values in configure().

### Animation

First, define the css-animation somewhere in your .css file:

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
  position: "top-center",
  animation: {
    in: "fadeIn", // try to comment it out
    out: "fadeOut",
    duration: 600 // overriding the default(300ms) value
  }
});

const App = () => (
  <div>
    <button
      onClick={() => {
        notifier.success("Your items have been updated");
      }}
    >
      Show two of them in different places
    </button>
  </div>
);
```

You can specify only in or out params as well.

### Remove notification items programmatically

```javascript
import React from "react";
import notifier from "simple-react-notifications";

notifier.configure({
  render: ({ id, onClose }) => (
    <RouteInfo
      key={id}
      onClosePanel={onClose}
      header={"The shortest way to ride home."}
    />
  )
});

class App extends React.Component {
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
