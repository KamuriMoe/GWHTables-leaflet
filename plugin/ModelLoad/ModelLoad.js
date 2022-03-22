function MountainLoad(id) {
    var camera, scene, renderer;
    var container;
    var ambientLight, pointLight;

    var controls;

    //    初始化
    init();
    //  循环渲染每一帧
    animate();
    camera.lookAt(scene);

    function init() {
        //    初始化相机

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 150;
        camera.position.x = 50;
        camera.position.y = 100;
        // camera.lookAt(scene.position);

        //    初始场景
        scene = new THREE.Scene();

        //    初始化灯光
        //    环境光 能保持整体都是亮点
        ambientLight = new THREE.AmbientLight(0x404040);
        //    点光源 白色灯光 亮度0.6
        pointLight = new THREE.PointLight(0xffffff, 0.6);


        //    将灯光加入到场景中
        scene.add(ambientLight);
        //    将灯光加到摄像机中 点光源跟随摄像机移动
        //    这样后期处理时辉光效果更好
        camera.add(pointLight);

        //   将摄像机加入到场景
        scene.add(camera);

        //   初始化渲染器
        renderer = new THREE.WebGLRenderer();

        // document.body.appendChild(renderer.domElement);
        var dom =$(id)[0]
        dom.appendChild(renderer.domElement);
        renderer.setSize(dom.clientWidth, dom.clientHeight);

        //    轨道控制器,可以控制模型的缩放
        controls = new THREE.OrbitControls(camera, renderer.domElement);





        // 生成底面二维多边形
        var points = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(30, 0),
            new THREE.Vector2(30, 20),
            new THREE.Vector2(50, 20),
            new THREE.Vector2(50, 70),
            new THREE.Vector2(0, 70),
            new THREE.Vector2(0, 0),
        ];
        var shape = new THREE.Shape(points);
        // var geometry = new THREE.ShapeGeometry(shape, 25);
        var material = new THREE.MeshBasicMaterial({
            color: 0x0000ff, //三角面颜色
            side: THREE.DoubleSide //两面可见
        });
        var geometry = new THREE.ExtrudeGeometry(//拉伸造型
            shape,//二维轮廓
            //拉伸参数
            {
                amount: 10,//拉伸长度
                bevelEnabled: false//无倒角
            }
        );
        var material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        var mesh1 = new THREE.Mesh(geometry, material);
        mesh1.rotateX(Math.PI / 2);
        mesh1.translateZ(-10);
        scene.add(mesh1);

        // 模型二
        var points = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(30, 0),
            new THREE.Vector2(30, 20),
            new THREE.Vector2(50, 20),
            new THREE.Vector2(50, 70),
            new THREE.Vector2(0, 70),
            new THREE.Vector2(0, 0),
        ];
        var shape = new THREE.Shape(points);
        // var geometry = new THREE.ShapeGeometry(shape, 25);
        var material = new THREE.MeshBasicMaterial({
            color: 0x0000ff, //三角面颜色
            side: THREE.DoubleSide //两面可见
        });
        var geometry = new THREE.ExtrudeGeometry(//拉伸造型
            shape,//二维轮廓
            //拉伸参数
            {
                amount: 10,//拉伸长度
                bevelEnabled: false//无倒角
            }
        );
        var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        var mesh2 = new THREE.Mesh(geometry, material);
        mesh2.rotateX(Math.PI / 2);
        mesh2.translateZ(-20);

        scene.add(mesh2);

        // 模型三
        var points = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(30, 0),
            new THREE.Vector2(30, 20),
            new THREE.Vector2(50, 20),
            new THREE.Vector2(50, 70),
            new THREE.Vector2(0, 70),
            new THREE.Vector2(0, 0),
        ];
        var shape = new THREE.Shape(points);
        // var geometry = new THREE.ShapeGeometry(shape, 25);
        var material = new THREE.MeshBasicMaterial({
            color: 0x0000ff, //三角面颜色
            side: THREE.DoubleSide //两面可见
        });
        var geometry = new THREE.ExtrudeGeometry(//拉伸造型
            shape,//二维轮廓
            //拉伸参数
            {
                amount: 10,//拉伸长度
                bevelEnabled: false//无倒角
            }
        );
        var material = new THREE.MeshPhongMaterial({ color: 0x808080 });
        var mesh3 = new THREE.Mesh(geometry, material);
        mesh3.rotateX(Math.PI / 2);
        mesh3.translateZ(-30);

        scene.add(mesh3);

    }



    function animate() {


        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

}