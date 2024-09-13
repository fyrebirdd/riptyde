import { mat4, Mat4, Vec3 } from 'wgpu-matrix';
import { degToRad } from 'wgpu-matrix/dist/2.x/utils';

export class Object3D {
	constructor(position: Vec3, rotation: Vec3, scale: Vec3) {
		this._position = position;
		this._rotation = rotation;
		this._scale = scale;
		this.UpdateTransformationMatrix();
	}

	private UpdateTransformationMatrix() {
		this._transformationMatrix = mat4.identity();
		// Transform
		mat4.translate(
			this._transformationMatrix,
			this._position,
			this._transformationMatrix
		);
		// Rotate
		mat4.rotateX(
			this._transformationMatrix,
			degToRad(this._rotation[0]),
			this._transformationMatrix
		);
		mat4.rotateY(
			this._transformationMatrix,
			degToRad(this._rotation[1]),
			this._transformationMatrix
		);
		mat4.rotateZ(
			this._transformationMatrix,
			degToRad(this._rotation[2]),
			this._transformationMatrix
		);
		// Scale
		mat4.scale(
			this._transformationMatrix,
			this._scale,
			this._transformationMatrix
		);
	}

	// Getters and Setters

	public get position() {
		return this._position;
	}
	public get rotation() {
		return this._rotation;
	}
	public get scale() {
		return this._scale;
	}
	public get transformationMatrix() {
		return this._transformationMatrix;
	}

	public set position(newPos: Vec3) {
		this._position = newPos;
		this.UpdateTransformationMatrix;
	}
	public set rotation(newRot: Vec3) {
		this._rotation = newRot;
		this.UpdateTransformationMatrix;
	}
	public set scale(newScale: Vec3) {
		this._scale = newScale;
		this.UpdateTransformationMatrix;
	}

	// Properties

	private _position: Vec3;
	private _rotation: Vec3;
	private _scale: Vec3;
	private _transformationMatrix: Mat4;
}
