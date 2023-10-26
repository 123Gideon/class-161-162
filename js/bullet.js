AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootbullet();
  },

  shootbullet: function () {
    window.addEventListener("keydown", (e) => {
      console.log(e);
      if (e.key == "z") {
        var bullet = document.createElement("a-entity");
        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });
        bullet.setAttribute("material", "color", "red");

        var camera = document.querySelector("#camera");
        pos = camera.getAttribute("position");
        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        bullet.setAttribute("velocity", direction.multiplyScalar(-10));
        var scene = document.querySelector("#scene");

        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });
        bullet.addEventListener("collide", this.removeBullet);
        scene.appendChild(bullet);

        //
      }
    });
  },

  removeBullet: function (e) {
    // bullet
    console.log("bullet collision: ", e.detail.target.el);

    console.log("box collision: ", e.detail.body.el);

    var element = e.detail.target.el;
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("box")) {
      elementHit.setAttribute("material", {
        color: "black",
      });

      var impluse = new CANNON.vec3(-2, 2, 1);
      var worldPoint = new CANNON.vec3().copy(
        elementHit.getAttribute("positive")
      );
      elementHit.body.applyImpluse(impluse, worldPoint);
    }
  },
});
