import { SpatialSceneNode } from '@hra-api/ng-client';

/**
 * Start spatial search flow action
 */
export class StartSpatialSearchFlow {
  /** Type for StartSpatialSearchFlow action */
  static readonly type = '[SpatialSearchUi] Start the Spatial Search flow';
}

/**
 * Set sex action
 */
export class SetSex {
  /** Type for SetSex action */
  static readonly type = '[SpatialSearchUi] Set sex';

  /**
   * Creates an instance of set sex
   * @param sex Sex value
   */
  constructor(readonly sex: 'male' | 'female') {}
}

/**
 * Set organ action
 */
export class SetOrgan {
  /** Type for SetOrgan action */
  static readonly type = '[SpatialSearchUi] Set organ';

  /**
   * Creates an instance of set organ
   * @param organId Organ ID
   */
  constructor(readonly organId: string | undefined) {}
}

/**
 * Set spatial search position action
 */
export class SetPosition {
  /** Type for SetPosition action */
  static readonly type = '[SpatialSearchUi] Set position';

  /**
   * Creates an instance of set position
   * @param position Spatial search position
   */
  constructor(readonly position: { x: number; y: number; z: number }) {}
}

/**
 * Move to node action
 */
export class MoveToNode {
  /** Type for MoveToNode action */
  static readonly type = '[SpatialSearchUi] Start moving the position to a scene node';

  /**
   * Creates an instance of move to node
   * @param node Spatial scene node
   */
  constructor(readonly node: SpatialSceneNode) {}
}

/**
 * Reset spatial search position action
 */
export class ResetPosition {
  /** Type for ResetPosition action */
  static readonly type = '[SpatialSearchUi] Reset position';
}

/**
 * Set spatial search radius action
 */
export class SetRadius {
  /** Type for SetRadius action */
  static readonly type = '[SpatialSearchUi] Set radius';

  /**
   * Creates an instance of set radius
   * @param radius Spatial search radius
   */
  constructor(readonly radius: number) {}
}

/**
 * Reset spatial search radius action
 */
export class ResetRadius {
  /** Type for ResetRadius action */
  static readonly type = '[SpatialSearchUi] Reset radius';
}

/**
 * Update spatial search data action
 */
export class UpdateSpatialSearch {
  /** Type for UpdateSpatialSearch action */
  static readonly type = '[SpatialSearchUi] Update spatial search data';
}

/**
 * Generate and add spatial search action
 */
export class GenerateSpatialSearch {
  /** Type for GenerateSpatialSearch action */
  static readonly type = '[SpatialSearchUi] Generate and add a spatial search';
}

/**
 * Set execute search on generate action
 */
export class SetExecuteSearchOnGenerate {
  /** Type for SetExecuteSearchOnGenerate */
  static readonly type = '[SpatialSearchUi] Set execute search on generate';

  /**
   * Creates an instance of set execute search on generate
   * @param [execute] Boolean value to execute search on generate
   */
  constructor(readonly execute = true) {}
}
